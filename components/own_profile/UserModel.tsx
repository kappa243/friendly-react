// TODO: is it a proper place for this model

export type Friend = {
    id: string;
    username: string;
    photo: string;
    description: string;
  };
  


// mock friends list
export const friends: Friend[] = [
    {
      id: "0",
      username: "Arya Stark",
      photo: "https://fwcdn.pl/fcp/68/48/476848/12529.1.jpg",
      description:
        "I am a fictional character in American author George R. R. Martin's A Song of Ice and Fire epic fantasy novel series and its HBO television adaptation Game of Thrones. I am tomboyish, headstrong, feisty, independent, and disdain traditional female pursuits."
    },
    {
      id: "1",
      username: "Jon Snow",
      photo: "https://fwcdn.pl/cpo/08/54/854/1014.4.jpg",
      description:
        "I am a character in George R. R. Martin's A Song of Ice and Fire series and its adaptation, Game of Thrones. I am the bastard son of Eddard Stark, raised at Winterfell. Known for my sense of honor, loyalty, and bravery, I join the Night's Watch to protect the realm from the dangers beyond the Wall."
    },
    {
      id: "2",
      username: "Daenerys Targaryen",
      photo: "https://fwcdn.pl/cpo/08/50/850/1012.4.jpg",
      description:
        "I am a fictional character from George R. R. Martin's A Song of Ice and Fire series and its television adaptation, Game of Thrones. I am the last known member of House Targaryen and am driven to reclaim my family’s throne. With the help of my dragons, I seek to bring justice and change to the Seven Kingdoms."
    },
    {
      id: "3",
      username: "Tyrion Lannister",
      photo: "https://fwcdn.pl/fcp/68/48/476848/13003.1.jpg",
      description:
        "I am a character from George R. R. Martin's A Song of Ice and Fire and Game of Thrones. Known for my sharp wit, intelligence, and love for books and wine, I navigate life as a dwarf in the powerful Lannister family. My strategic mind and diplomacy often play key roles in the realm’s political landscape."
    },
    {
      id: "4",
      username: "Samwell Tarly",
      photo: "https://fwcdn.pl/cpo/10/10/1010/1233.4.jpg",
      description:
        "I am a character in A Song of Ice and Fire and Game of Thrones. Born into a noble family but lacking traditional warrior qualities, I join the Night's Watch, where I discover my love for books and knowledge. Despite my fears, I prove my courage and intelligence, ultimately becoming a skilled healer and loyal friend."
    },
    {
      id: "5",
      username: "Davos Seaworth",
      photo: "https://fwcdn.pl/cpo/10/48/1048/1300.4.jpg",
      description:
        "I am a character in George R. R. Martin's A Song of Ice and Fire series and its adaptation, Game of Thrones. Known as the 'Onion Knight,' I am a loyal and honorable advisor to Stannis Baratheon. My humble beginnings and moral compass make me a unique figure in the turbulent politics of Westeros."
    }
  ];