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

}
