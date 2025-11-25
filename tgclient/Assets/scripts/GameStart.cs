using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameStart : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }


    public void ItemList(AuthClient kClient)
    {
        StartCoroutine(kClient.send_itemList());
    }


    public void ItemAdd(AuthClient kClient)
    {
        StartCoroutine(kClient.send_itemAdd());
    }


    public void ItemUse(AuthClient kClient)
    {
        StartCoroutine(kClient.send_itemUse());
    }


    public void ItemRemove(AuthClient kClient)
    {
        StartCoroutine(kClient.send_itemRemove());
    }




    public void HeroList(AuthClient kClient)
    {
        StartCoroutine(kClient.send_heroList());
    }


    public void HeroCreate(AuthClient kClient)
    {
        StartCoroutine(kClient.send_heroCreate());
    }


    public void HeroLevel(AuthClient kClient)
    {
        StartCoroutine(kClient.send_heroLevel());
    }


    public void HeroLocation(AuthClient kClient)
    {
        StartCoroutine(kClient.send_heroLocation());
    }


    public void HeroRemove(AuthClient kClient)
    {
        StartCoroutine(kClient.send_heroRemove());
    }






    public void EquipList(AuthClient kClient)
    {
        StartCoroutine(kClient.send_equipList());
    }


    public void EquipCreate(AuthClient kClient)
    {
        StartCoroutine(kClient.send_equipCreate());
    }


    public void EquipInstall(AuthClient kClient)
    {
        StartCoroutine(kClient.send_equipInstall());
    }


    public void EquipUnInstall(AuthClient kClient)
    {
        StartCoroutine(kClient.send_equipUninstall());
    }


    public void EquipLevel(AuthClient kClient)
    {
        StartCoroutine(kClient.send_equipLevel());
    }


    public void EquipLock(AuthClient kClient)
    {
        StartCoroutine(kClient.send_equipLock());
    }


    public void EquipRemove(AuthClient kClient)
    {
        StartCoroutine(kClient.send_equipRemove());
    }

}
