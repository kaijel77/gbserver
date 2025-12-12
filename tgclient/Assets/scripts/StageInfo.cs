using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class StageInfo : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }


    public void StageList(AuthClient kClient)
    {
        StartCoroutine(kClient.send_stageList());
    }

    public void StageStart(AuthClient kClient)
    {
        StartCoroutine(kClient.send_stageStart());
    }

    public void StageEnd(AuthClient kClient)
    {
        StartCoroutine(kClient.send_stageEnd());
    }

    public void StageReward(AuthClient kClient)
    {
        StartCoroutine(kClient.send_stageReward());
    }

    public void ContinentReward(AuthClient kClient)
    {
        StartCoroutine(kClient.send_continentReward());
    }

}
