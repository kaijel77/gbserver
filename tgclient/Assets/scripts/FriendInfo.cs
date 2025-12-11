using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class FriendInfo : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }


    public void FriendList(AuthClient kClient)
    {
        StartCoroutine(kClient.send_friendList());
    }


    public void FriendInviteList(AuthClient kClient)
    {
        StartCoroutine(kClient.send_friendInviteList());
    }

    public void FriendRequestList(AuthClient kClient)
    {
        StartCoroutine(kClient.send_friendRequestList());
    }

    public void FriendInvite(AuthClient kClient)
    {
        StartCoroutine(kClient.send_friendInvite());
    }

    public void FriendInviteCancel(AuthClient kClient)
    {
        StartCoroutine(kClient.send_friendInviteCancel());
    }

    public void FriendAcceptCancel(AuthClient kClient)
    {
        StartCoroutine(kClient.send_friendAcceptCancel());
    }

    public void FriendAcceptConfirm(AuthClient kClient)
    {
        StartCoroutine(kClient.send_friendAcceptConfirm());
    }

    public void FriendKickOut(AuthClient kClient)
    {
        StartCoroutine(kClient.send_friendKickOut());
    }

}
