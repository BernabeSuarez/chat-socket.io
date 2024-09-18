import { Card, CardContent, CardTitle } from "@/components/ui/card";

const ChatCard = ({ message, user }: { message: string; user: string }) => {
  return (
    <Card className="bg-slate-500 p-2 w-full">
      <CardTitle>{user ? user : "Anonymous"}</CardTitle>
      <CardContent className="flex justify-center items-center">
        <p>{message}</p>
      </CardContent>
    </Card>
  );
};

export default ChatCard;
