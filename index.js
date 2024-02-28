// test team match algorithm

const teams = [];
const guilds = {};

let memberCount = 0;
const MaxMember = 3;
const Thread = 6

const addNewmember = (memberInfo) => {
    memberCount++;
    const guildId = memberInfo.guildId;
    if (!guilds[guildId]) {
        // first guild member
        guilds[guildId] = [memberInfo];
    }
    else {
        guilds[guildId] = [...guilds[guildId], memberInfo]
    }
}

const rematch = () => {
    // team count
    let restTeamCount = Math.floor(memberCount / 3)

    // match team with 3 member in guilds
    Object.keys(guilds).map(id => {
        let guild = guilds[id];
        // non guild member
        if (id == 0) return;

        while (guild.length >= 3) {
            // Skip once all teams are filled
            if (restTeamCount == 0) return;
            let teamMembers = guild.splice(0, 3);
            teams.push(teamMembers);
            restTeamCount--;
        }
    });

    // match team with 2 member
    Object.keys(guilds).map(id => {
        let guild = guilds[id];
        // non guild member
        if (id == 0) return;

        while (guild.length >= 2) {
            // Skip once all teams are filled
            if (restTeamCount == 0) return;
            let teamMembers = guild.splice(0, 2);
            teams.push(teamMembers);
            restTeamCount--;
        }
    });

    // fill rest members
    let restMembers = []
    Object.keys(guilds).map((id) => {
        let guild = guilds[id];
        restMembers = [...restMembers, ...guild]
    });

    for (let teamIndex = 0; teamIndex < Math.ceil(memberCount / 3); teamIndex++) {

        if (restMembers.length == 0) break;
        // add new team
        if (teams.length <= teamIndex) teams.push([]);

        //fill members in team
        while (teams[teamIndex].length < 3) {
            if (restMembers.length == 0) break;
            let newMember = restMembers.pop()
            teams[teamIndex].push(newMember);
        }
    }
}

const tempMemberInfos = [
    {
        name: "logan",
        guildId: 1
    },
    {
        name: "logan1",
        guildId: 4
    },
    {
        name: "logan2",
        guildId: 0
    },
    {
        name: "logan3",
        guildId: 3
    },
    {
        name: "logan4",
        guildId: 4
    },
    {
        name: "logan5",
        guildId: 2
    },
    {
        name: "logan6",
        guildId: 4
    },
    {
        name: "logan7",
        guildId: 4
    },
    {
        name: "logan8",
        guildId: 1
    },
    {
        name: "logan9",
        guildId: 2
    },
    {
        name: "logan10",
        guildId: 1
    },
    {
        name: "logan11",
        guildId: 4
    },
    {
        name: "logan12",
        guildId: 2
    },
    {
        name: "logan13",
        guildId: 5
    },
    {
        name: "logan14",
        guildId: 5
    },
    {
        name: "logan15",
        guildId: 2
    },
    {
        name: "logan16",
        guildId: 3
    },
    {
        name: "logan17",
        guildId: 1
    },
    {
        name: "logan18",
        guildId: 2
    },
    {
        name: "logan10",
        guildId: 0
    },
    {
        name: "logan11",
        guildId: 0
    },
    {
        name: "logan18",
        guildId: 2
    },
]

const main = () => {
    tempMemberInfos.map((memberInfo) => {
        addNewmember(memberInfo);
    })
    console.log(guilds);
    rematch()
    console.log(teams);
}

main();