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
public class continentStageStart
{
    public int stage_id;
    public int deck_type;

    public continentStageStart(int stageid, int decktype)
    {
        stage_id = stageid;
        deck_type = decktype;
    }
}




[System.Serializable]
public class continentStageEnd
{
    public int stage_id;
    public int deck_type;

    public continentStageEnd(int stageid, int decktype)
    {
        stage_id = stageid;
        deck_type = decktype;
    }
}



[System.Serializable]
public class continentStageReward
{
    public int stage_id;
    public int deck_type;

    public continentStageReward(int stageid, int decktype)
    {
        stage_id = stageid;
        deck_type = decktype;
    }
}



[System.Serializable]
public class continentReward
{
    public int stage_id;
    public int deck_type;

    public continentReward(int stageid, int decktype)
    {
        stage_id = stageid;
        deck_type = decktype;
    }
}


