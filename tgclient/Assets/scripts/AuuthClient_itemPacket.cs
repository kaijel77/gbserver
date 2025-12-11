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
public class itemAdd
{
    public int item_no;
    public int item_id;
    public int item_type;
    public int item_count;

    public itemAdd(int itemno, int itemid, int itemtype, int itemcount)
    {
        item_no = itemno;

        item_id = itemid;

        item_type = itemtype;

        item_count = itemcount;
    }
}


[System.Serializable]
public class itemUse
{
    public int item_no;
    public int item_count;

    public itemUse(int itemno, int itemcount)
    {
        item_count = itemcount;

        item_no = itemno;
    }
}


[System.Serializable]
public class itemRemove
{
    public int item_no;

    public itemRemove(int itemno)
    {

        item_no = itemno;
    }
}
