using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using Unity.VisualScripting;
using UnityEngine;



public static class AESUtil
{
    public static string key = "7e510acb6ee42e08ee5a13a3e5906c7b"; // 32바이트
    public static string ivs = "1234567890123456";                 // 16바이트
    public static int iv_size = 16;

    // AES256 CBC 암호화
    public static string Encrypt(string plainText)
    {
        byte[] keyBytes = Encoding.UTF8.GetBytes(key);
        // 🔹 1️⃣ 랜덤 IV 생성 (16 bytes)
        byte[] ivBytes = new byte[16];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(ivBytes);
        }

        byte[] plainBytes = Encoding.UTF8.GetBytes(plainText);

        using (Aes aes = Aes.Create())
        {
            aes.KeySize = 256; // AES-256
            aes.BlockSize = 128;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;

            aes.Key = keyBytes;
            aes.IV = ivBytes;

            using (ICryptoTransform encryptor = aes.CreateEncryptor())
            {
                byte[] cipherBytes = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);

                // [IV + CipherText]
                byte[] combined = new byte[ivBytes.Length + cipherBytes.Length];
                Buffer.BlockCopy(ivBytes, 0, combined, 0, ivBytes.Length);
                Buffer.BlockCopy(cipherBytes, 0, combined, ivBytes.Length, cipherBytes.Length);

                return Convert.ToBase64String(combined);
            }
        }
    }

    // AES256 CBC 복호화
    public static string Decrypt(string cipherTextBase64)
    {
        byte[] keyBytes = Encoding.UTF8.GetBytes(key);
        byte[] cipherBytes = Convert.FromBase64String(cipherTextBase64);


        int length = Math.Min(iv_size, cipherBytes.Length);
        byte[] partBytes = new byte[length];
        Array.Copy(cipherBytes, 0, partBytes, 0, length);

        // Base64로 인코딩해서 문자열로 변환
        string ivtext = Convert.ToBase64String(partBytes);
        byte[] ivBytes = Encoding.UTF8.GetBytes(ivtext);

        using (Aes aes = Aes.Create())
        {
            aes.KeySize = 256;
            aes.BlockSize = 128;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;

            aes.Key = keyBytes;
            aes.IV = ivBytes;

            using (var decryptor = aes.CreateDecryptor())
            {
                byte[] decrypted = decryptor.TransformFinalBlock(cipherBytes, 0, cipherBytes.Length);
                return Encoding.UTF8.GetString(decrypted);
            }
        }
    }
}



/*
using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using UnityEngine;

public static class AES256Util
{
    private static readonly string key = "여기에_NODEJS와_동일한_KEY_32바이트"; // 32바이트

    // Node.js에서 암호화된 base64 문자열 복호화
    public static string DecryptFromNode(string base64Combined)
    {
        byte[] combinedData = Convert.FromBase64String(base64Combined);
        byte[] iv = new byte[16];
        byte[] cipherText = new byte[combinedData.Length - 16];

        Array.Copy(combinedData, 0, iv, 0, 16);
        Array.Copy(combinedData, 16, cipherText, 0, cipherText.Length);

        using (Aes aes = Aes.Create())
        {
            aes.Key = Encoding.UTF8.GetBytes(key);
            aes.IV = iv;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;

            using (ICryptoTransform decryptor = aes.CreateDecryptor())
            {
                byte[] plainBytes = decryptor.TransformFinalBlock(cipherText, 0, cipherText.Length);
                return Encoding.UTF8.GetString(plainBytes);
            }
        }
    }

    // Node.js에서 복호화 가능한 암호문 생성 (Unity → Node)
    public static string EncryptForNode(string plainText)
    {
        byte[] iv = new byte[16];
        new System.Random().NextBytes(iv); // 랜덤 IV 생성

        using (Aes aes = Aes.Create())
        {
            aes.Key = Encoding.UTF8.GetBytes(key);
            aes.IV = iv;
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;

            using (ICryptoTransform encryptor = aes.CreateEncryptor())
            {
                byte[] plainBytes = Encoding.UTF8.GetBytes(plainText);
                byte[] cipherBytes = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);

                // [IV + CipherText]
                byte[] combined = new byte[iv.Length + cipherBytes.Length];
                Buffer.BlockCopy(iv, 0, combined, 0, iv.Length);
                Buffer.BlockCopy(cipherBytes, 0, combined, iv.Length, cipherBytes.Length);

                return Convert.ToBase64String(combined);
            }
        }
    }
} */