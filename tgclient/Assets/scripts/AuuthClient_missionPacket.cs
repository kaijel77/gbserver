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
public class missionUpdate
{
    public int mission_id;
    public int mission_count;

    public missionUpdate(int missionid, int missioncount)
    {

        mission_id = missionid;

        mission_count = missioncount;
    }
}

[System.Serializable]
public class missionComplete
{
    public int mission_id;

    public missionComplete(int missionid)
    {
        mission_id = missionid;
    }
}

[System.Serializable]
public class missionReward
{
    public int mission_id;

    public missionReward(int missionid)
    {
        mission_id = missionid;
    }
}

[System.Serializable]
public class missionRemove
{
    public int mission_id;

    public missionRemove(int missionid)
    {
        mission_id = missionid;
    }
}