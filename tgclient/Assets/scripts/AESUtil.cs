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

            using (var encryptor = aes.CreateEncryptor())
            {
                byte[] encrypted = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);
                return Convert.ToBase64String(encrypted); // Base64 인코딩
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