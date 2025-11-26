using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class GuildInfo : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }


    public void GuildList(AuthClient kClient)
    {
        StartCoroutine(kClient.send_guildList());
    }
    /*


    public void GuildSearch(AuthClient kClient)
    {
        StartCoroutine(kClient.send_guildSearch());
    }


    public void GuildMemberList(AuthClient kClient)
    {
        StartCoroutine(kClient.send_guildMemberList());
    }


    public void GuildRequestList(AuthClient kClient)
    {
        StartCoroutine(kClient.send_guildRequestList());
    }
    */

    public void GuildCheckName(AuthClient kClient)
    {
        StartCoroutine(kClient.send_guildCheckName());
    }

    public void GuildCreate(AuthClient kClient)
    {
        StartCoroutine(kClient.send_guildCreate());
    }

    public void GuildBreakUp(AuthClient kClient)
    {
        StartCoroutine(kClient.send_guildBreakUp());
    }


    public void GuildChangeName(AuthClient kClient)
    {
        StartCoroutine(kClient.send_guildChangeName());
    }

    /*

        public void GuildRequest(AuthClient kClient)
        {
            StartCoroutine(kClient.send_guildRequest());
        }

        public void GuildRequestAccept(AuthClient kClient)
        {
            StartCoroutine(kClient.send_guildRequestAccept());
        }

        public void GuildRequestCancel(AuthClient kClient)
        {
            StartCoroutine(kClient.send_guildRequestCancel());
        }


        public void GuildWithdrawal(AuthClient kClient)
        {
            StartCoroutine(kClient.send_guildWithdrawal());
        }


        public void GuildKickOut(AuthClient kClient)
        {
            StartCoroutine(kClient.send_guildKickOut());
        }


        public void GuildChangeUserGrade(AuthClient kClient)
        {
            StartCoroutine(kClient.send_guildChangeUserGrade());
        }

        */
}
