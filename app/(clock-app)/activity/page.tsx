import { getAllUsers, isClockedIn } from "@/app/actions";
import ActivityUserCard from "@/app/(clock-app)/activity/ActivityUserCard";

export default async function Activity() {
  type User = {
    name: string;
    clockedIn: boolean;
  };

  async function getNamesOfClockedInAndOutUsers() {
    const users = await getAllUsers();
    const namesOfClockedInUsers: User[] = [];
    const namesOfClockedOutUsers: User[] = [];
    for (const user of users) {
      if (user.email) {
        const userClockedIn = await isClockedIn(user.email);
        if (userClockedIn) {
          if (user.name) {
            namesOfClockedInUsers.push({ name: user.name, clockedIn: true });
          } else {
            namesOfClockedInUsers.push({ name: user.email, clockedIn: true });
          }
        } else {
          if (user.name) {
            namesOfClockedOutUsers.push({ name: user.name, clockedIn: false });
          } else {
            namesOfClockedOutUsers.push({ name: user.email, clockedIn: false });
          }
        }
      }
    }

    return [...namesOfClockedInUsers.sort(), ...namesOfClockedOutUsers.sort()];
  }

  const namesOfClockedInAndOutUsers = await getNamesOfClockedInAndOutUsers();
  return (
    <div>
      {namesOfClockedInAndOutUsers.map((user, index) => (
        <ActivityUserCard
          name={user.name}
          clockedIn={user.clockedIn}
          key={index}
        ></ActivityUserCard>
      ))}
    </div>
  );
}
