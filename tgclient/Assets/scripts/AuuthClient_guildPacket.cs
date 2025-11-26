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
public class guildSearch
{
    public int mission_id;

    public guildSearch(int missionid)
    {
        mission_id = missionid;
    }
}


[System.Serializable]
public class guildCheckName
{
    public string guild_name;

    public guildCheckName(string guildname)
    {
    guild_name = guildname;
    }
}



[System.Serializable]
public class guildCreate
{
    public string guild_name;

    public guildCreate(string guildname)
    {
        guild_name = guildname;
    }
}


[System.Serializable]
public class guildBreakUp
{
    public int guild_no;

    public guildBreakUp(int guildno)
    {
        guild_no = guildno;
    }
}


[System.Serializable]
public class guildChangeName
{
    public int guild_no;
    public string guild_name;

    public guildChangeName(int guildno, string guildname)
    {
        guild_no = guildno;
        guild_name = guildname;
    }
}