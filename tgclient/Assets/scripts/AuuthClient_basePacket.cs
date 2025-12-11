using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Windows;



[System.Serializable]
public class UserData
{
    public string username;
    public string password;
    public UserData(string u, string p)
    {
        username = u;
        password = p;
    }
}

[System.Serializable]
public class cryptData
{
    public string crypt;
    public cryptData(string u)
    {
        crypt = u;
    }
}


[System.Serializable]
public class gamecharname
{
    public string gamechar_name;
    public gamecharname(string u)
    {
        gamechar_name = u;
    }
}

[System.Serializable]
public class LoginResponse
{
    public bool success;
    public string authToken;
}

[System.Serializable]
public class UserInfo
{
    public int accountno;
    public string user_id;
    public string password;
}

[System.Serializable]
public class Data
{
    public string server_time;
    public bool isCreateAccount;
    public bool isNickSetting;
    public string authToken;
    public UserInfo userInfo;
    // serverAddress가 빈 객체 {} 이므로, 임시로 string 처리 가능
    public string serverAddress;
}

[System.Serializable]
public class Login2Response
{
    public int errorCode;
    public bool isSuccess;
    public Data data;
}




[System.Serializable]
public class NickCreate
{
    public string result;
}

[System.Serializable]
public class gameNickCreate
{
    public int errorCode;
    public bool isSuccess;
    public NickCreate data;
}



[System.Serializable]
public class startgameList
{
    public string itemList;
    public string heroList;
    public string equipList;
}

[System.Serializable]
public class startGame
{
    public int errorCode;
    public bool isSuccess;
    public startgameList data;
}
