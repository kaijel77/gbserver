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
public class heroCreate
{
    public int hero_id;
    public int hero_type;
    public int hero_grade;
    public int hero_star;

    public heroCreate(int heroid, int herotype, int herograde, int herostar)
    {
        hero_id = heroid;

        hero_type = herotype;

        hero_grade = herograde;

        hero_star = herostar;
    }
}


[System.Serializable]
public class heroLevel
{
    public int hero_no;
    public int hero_grade;
    public int hero_star;
    public int hero_level;
    public int hero_exp;

    public heroLevel(int herono, int herograde, int herostar, int herolevel, int heroexp)
    {
        hero_no = herono;

        hero_grade = herograde;

        hero_star = herostar;

        hero_level = herolevel;

        hero_exp = heroexp;
    }
}


[System.Serializable]
public class heroLocation
{
    public int hero_no;
    public int hero_location;
    public int hero_task;

    public heroLocation(int herono, int herolocation, int herotask)
    {
        hero_no = herono;
        hero_location = herolocation;
        hero_task = herotask;
    }
}


[System.Serializable]
public class heroRemove
{
    public int hero_no;

    public heroRemove(int herono)
    {

        hero_no = herono;
    }
}

