using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class BuildingInfo : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void BuildingList(AuthClient kClient)
    {
        StartCoroutine(kClient.send_buildingList());
    }

    public void BuildingBuild(AuthClient kClient)
    {
        StartCoroutine(kClient.send_buildingBuild());
    }


    public void BuildingUpgrade(AuthClient kClient)
    {
        StartCoroutine(kClient.send_buildingUpgrade());
    }


    public void BuildingEndTime(AuthClient kClient)
    {
        StartCoroutine(kClient.send_buildingEndtime());
    }


    public void BuildingDestroy(AuthClient kClient)
    {
        StartCoroutine(kClient.send_buildingDestroy());
    }

}
