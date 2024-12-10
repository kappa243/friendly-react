export type Friend = {
  id: string;
  username: string;
  photo: string;
};


// mock friends list
export const friends: Friend[] = [
  { id: "1", username: "Jon Snow", photo: "https://fwcdn.pl/cpo/08/54/854/1014.4.jpg" },
  { id: "2", username: "Daenerys Targaryen", photo: "https://fwcdn.pl/cpo/08/50/850/1012.4.jpg" },
  { id: "3", username: "Tyrion Lannister", photo: "https://fwcdn.pl/fcp/68/48/476848/13003.1.jpg" },
  { id: "4", username: "Samwell Tarly", photo: "https://fwcdn.pl/cpo/10/10/1010/1233.4.jpg" },
  { id: "5", username: "Davos Seaworth", photo: "https://fwcdn.pl/cpo/10/48/1048/1300.4.jpg" },
];