import { ImageUp } from "lucide-react";
import { Separator } from "../../components/shadcn/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/shadcn/ui/card";
import { useUserStore } from "../../stores/userStore";
import { m } from "../../i18n/paraglide/messages";
import { useMutation } from "@tanstack/react-query";
import { kyAspDotnet } from "../../api/ky";
import { buildFormData } from "../../utils/api";

function UserProfile() {
  const user = useUserStore(state => state.user);
  const setUser = useUserStore(state => state.setUser);

  const uploadImg = useMutation({
    mutationFn: async (img) => {
      if (img.size > 2 * 1024 * 1024) throw new Error(m["profile.alert.imgOverSizeLimit"]())

      return await kyAspDotnet.put(`api/user/${user.id}/image`, {
        body: buildFormData({ imageFile: img })
      }).json()
    },
    onSuccess: (data) => {
      setUser({image: data.image || "https://st4.depositphotos.com/11634452/21365/v/450/depositphotos_213659488-stock-illustration-picture-profile-icon-human-people.jpg"})
      console.log("after img: " + user);
      
    }
  })

  function handleImageUpload(e) {
    uploadImg.mutate(e.target.files[0]);
  }

  return (
    <article>
      <Card>
        <CardHeader>
          <CardTitle>{m["profile.personalInfo"]()}</CardTitle>
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
              {m["common.uploadImg"]()}
              <input disabled={uploadImg.isPending}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
            {uploadImg.isError && (
              <p className="text-red-500 text-center">{uploadImg.error.message}</p>
            )}
          </section>
        </CardContent>
      </Card>
    </article>
  );
}

export default UserProfile;