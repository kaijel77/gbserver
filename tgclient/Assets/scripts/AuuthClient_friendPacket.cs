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
public class friendInvite
{
    public int invite_no;

    public friendInvite(int inviteno)
    {
        invite_no = inviteno;
    }
}


[System.Serializable]
public class friendInviteCancel
{
    public int invite_no;

    public friendInviteCancel(int inviteno)
    {
        invite_no = inviteno;
    }
}


[System.Serializable]
public class friendAcceptCancel
{
    public int friend_no;

    public friendAcceptCancel(int friendno)
    {
        friend_no = friendno;
    }
}


[System.Serializable]
public class friendAcceptConfirm
{
    public int friend_no;

    public friendAcceptConfirm(int friendno)
    {
        friend_no = friendno;
    }
}


[System.Serializable]
public class friendKickOut
{
    public int friend_no;

    public friendKickOut(int friendno)
    {
        friend_no = friendno;
    }
}
