import { ImageUp } from "lucide-react";
import { Separator } from "../../components/shadcn/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/shadcn/ui/card";
import { useAuth } from "../../contexts/AuthContext";

function UserProfile() {
  const { user } = useAuth();

  async function handleImageUpload(e) {
    console.log(e.target.files[0]);
  }

  return (
    <article>
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cá nhân</CardTitle>
        </CardHeader>
        <div className="mx-4"><Separator /></div>
        <CardContent className="grid grid-cols-2 pt-4">
          <section>
            sdsdsdsdsd
          </section>

          <section className="flex flex-col gap-4 items-center">
            <img src={user.image} alt="User Avatar" className="size-50 rounded-full object-cover border-2 border-gray-200 mx-4" />
            <label className="cursor-pointer rounded-md border-2 p-2 text-xs flex gap-2 items-center hover:bg-amber-100">
              <ImageUp className="size-4" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </section>
        </CardContent>
      </Card>
    </article>
  );
}

export default UserProfile;