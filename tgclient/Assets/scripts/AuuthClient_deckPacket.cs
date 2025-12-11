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
public class deckSetting
{
    public int deck_type;
    public int deck_hero01;
    public int deck_hero02;
    public int deck_hero03;
    public int deck_hero04;
    public int deck_hero05;
    public int deck_hero06;
    public int deck_hero07;
    public int deck_hero08;

    public deckSetting(int decktype, int deckhero01, int deckhero02, int deckhero03, int deckhero04, int deckhero05, int deckhero06, int deckhero07, int deckhero08)
    {

        deck_type = decktype;

        deck_hero01 = deckhero01;

        deck_hero02 = deckhero02;

        deck_hero03 = deckhero03;

        deck_hero04 = deckhero04;

        deck_hero05 = deckhero05;

        deck_hero06 = deckhero06;

        deck_hero07 = deckhero07;

        deck_hero08 = deckhero08;

    }
}


[System.Serializable]
public class deckRemove
{
    public int deck_type;

    public deckRemove(int decktype)
    {
        deck_type = decktype;
    }
}


