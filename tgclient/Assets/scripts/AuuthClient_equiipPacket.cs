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
public class equipCreate
{
    public int equip_id;
    public int equip_type;
    public int equip_grade;
    public int equip_star;

    public equipCreate(int equipid, int equiptype, int equipgrade, int equipstar)
    {
        equip_id = equipid;

        equip_type = equiptype;

        equip_grade = equipgrade;

        equip_star = equipstar;
    }
}



[System.Serializable]
public class equipInstall
{
    public int equip_no;
    public int hero_no;
    public int equip_grade;
    public int equip_star;

    public equipInstall(int equipno, int herono)
    {
        equip_no = equipno;

        hero_no = herono;
    }
}


[System.Serializable]
public class equipUninstall
{
    public int equip_no;

    public equipUninstall(int equipno)
    {
        equip_no = equipno;
    }
}


[System.Serializable]
public class equipLevel
{
    public int equip_no;
    public int equip_grade;
    public int equip_star;
    public int equip_level;
    public int equip_exp;

    public equipLevel(int equipno, int equipgrade, int equipstar, int equiplevel, int equipexp)
    {
        equip_no = equipno;

        equip_grade = equipgrade;

        equip_star = equipstar;

        equip_level = equiplevel;

        equip_exp = equipexp;
    }
}


[System.Serializable]
public class equipLock
{
    public int equip_no;
    public int equip_lock;

    public equipLock(int equipno, int equiplock)
    {
        equip_no = equipno;
        equip_lock = equiplock;
    }
}


[System.Serializable]
public class equipRemove
{
    public int equip_no;

    public equipRemove(int equipno)
    {

        equip_no = equipno;
    }
}

