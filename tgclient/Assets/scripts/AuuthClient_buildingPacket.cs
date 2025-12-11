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
public class buildingBuild
{
    public int building_id;

    public buildingBuild(int buildingid)
    {
        building_id = buildingid;
    }
}


[System.Serializable]
public class buildingUpgrade
{
    public int building_id;

    public buildingUpgrade(int buildingid)
    {
        building_id = buildingid;
    }
}


[System.Serializable]
public class buildingEndtime
{
    public int building_id;

    public buildingEndtime(int buildingid)
    {
        building_id = buildingid;
    }
}


[System.Serializable]
public class buildingDestroy
{
    public int building_id;

    public buildingDestroy(int buildingid)
    {
        building_id = buildingid;
    }
}
