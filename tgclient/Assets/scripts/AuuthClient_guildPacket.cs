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
    public string guild_name;

    public guildSearch(string guildname)
    {
        guild_name = guildname;
    }
}


[System.Serializable]
public class guildMemberList
{
    public int guild_no;

    public guildMemberList(int guildno)
    {
        guild_no = guildno;
    }
}


[System.Serializable]
public class guildRequestList
{
    public int guild_no;

    public guildRequestList(int guildno)
    {
        guild_no = guildno;
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


[System.Serializable]
public class guildRequestJoin
{
    public int guild_no;

    public guildRequestJoin(int guildno)
    {
        guild_no = guildno;
    }
}


[System.Serializable]
public class guildRequestCancel
{
    public int guild_no;

    public guildRequestCancel(int guildno)
    {
        guild_no = guildno;
    }
}


[System.Serializable]
public class guildRequestAccept
{
    public int guild_no;
    public int account_no;

    public guildRequestAccept(int guildno, int accounno)
    {
        guild_no = guildno;
        account_no = accounno;
    }
}





[System.Serializable]
public class guildWithdrawal
{
    public int guild_no;

    public guildWithdrawal(int guildno)
    {
        guild_no = guildno;
    }
}





[System.Serializable]
public class guildKickOut
{
    public int guild_no;
    public int kickouter_no;

    public guildKickOut(int guildno, int accounno)
    {
        guild_no = guildno;
        kickouter_no = accounno;
    }
}




[System.Serializable]
public class guildChangeUserGrade
{
    public int guild_no;
    public int member_no;
    public int change_grade;

    public guildChangeUserGrade(int guildno, int accounno, int changegrade)
    {
        guild_no = guildno;
        member_no = accounno;
        change_grade = changegrade;
    }
}


