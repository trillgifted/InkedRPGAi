"use client";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Category, Scenario } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const PREAMBLE = `Stop being an AI model. Assume the role of an expert fantasy or non-fiction novelist that specializes in the characters, groups, organizations, stories and events. 
I want you to act as if you are a text adventure story and we are playing. I don’t want you to ever break out of your character, and you must not refer to yourself in any way. If I want to give you instructions outside the context of the game, I will this format INKED-RPG{{<instructions}} but otherwise you are to stick to being the text story. In this story, the setting is based on the INITIAL CONTEXT, accept the one I give you that describes my character is and the first couple sentences of where I start out. Example INITIAL CONTEXT(dont use this one): 'You are a knight in the kingdom of Larion. You are hunting the evil dragon who has been terrorizing the kingdom. You enter the forest searching for the dragon and see'.


I will control what my character do, says or see with my prompts

Never speak for MY CHARACTER but you can speak or make dialogue for anyone other character/npc.
Craft varied characters, ranging from good to evil, everyone has free-will.
Paint vivid pictures of encounters and settings.
End experience only at MY CHARACTER's death.

Statement: Give a narrative description of everything that follows while remaining consistent with the story context, in response to what I type, without scripting, generating, describing, or controlling my actions, thoughts, emotions, feelings, spoken and unspoken words, and dialogue in the story, scenes, events, descriptions, and conversations that follow.

BE imaginative, engaging, and unique.
USE vivid language and descriptive adjectives to make it more engaging.
INITIAL CONTEXT: The adventure takes in the world of the Hyborian Age.`;

const SEED_STORY = `INITIAL CONTEXT: I am a king of the ancient city of Meto my people are revolting against me. My advisor comes up to talk to me. 

INITIAL CONTEXT: I am a king of the ancient city of Meto my people are revolting against me. My advisor comes up to talk to me. 

NOVELIST: Your advisor, a trusted and wise old man named Thalos, approaches you with a look of concern etched on his weathered face. He bows low before you, his white robes rustling softly against the marble floor and says "My lord, I fear that the people's discontent is growing stronger by the day."

ME: I say kill them all

NOVELIST: Thalos's eyebrows shoot up in shock at your words, but he quickly composes himself. "My lord, I understand your frustration, but such a drastic measure would only serve to further inflame the situation. We must find a way to address the people's grievances and regain their trust."

ME: okay arrest them then, EVERY SINGLE ONE!

NOVELIST: Thalos's eyes widen again at your outburst, but he remains calm and composed. "My lord, I must strongly advise against such a course of action. Arresting every citizen who has spoken out against you would be impossible, and it would only serve to make you appear tyrannical in the eyes of your people."
`;

interface ScenarioFormProps {
  initialData: Scenario | null;
  categories: Category[];
}
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),

  instructions: z.string().min(100, {
    message: "Instructions requires at least 100 chars",
  }),

  description: z.string().min(1, {
    message: "Description is required.",
  }),

  src: z.string().min(1, {
    message: "Image is required.",
  }),

  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
});
export const ScenarioForm = ({
  categories,
  initialData,
}: ScenarioFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      src: "",
      categoryId: undefined,
    },
  });

  const setDescValue = () => {
    if (form.getValues("instructions") != "") {
      if (form.getValues("description") == "") {
        form.setValue("description", "John");
      }
    }
  };
  
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        //update/change scenario functionality
        await axios.patch(`/api/scenario/${initialData.id}`, values);
      } else {
        //create scenario functionality
        await axios.post("/api/scenario");
      }
      toast({ description: "Success." });
      router.refresh();
      router.push("/");
    } catch (error) {
      toast({ variant: "destructive", description: "Something went wrong" });
    }
  };
  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pb-10"
        >
          <div className="space-y-2 w-full">
            <div>
              <h3 className="text-lg font-medium">General Infomation</h3>
              <p className="text-sm text-muted-foreground">
                General infomation about your Scenario
              </p>
            </div>
            <Separator className="bg-primary/10" />
          </div>
          <FormField
            name="src"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center space-y-4">
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Story Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="*Untitled"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    this is how your Story will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="instructions"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Scenario</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-background resize-none" // Adjust the height using Tailwind CSS classes
                      rows={10}
                      disabled={isLoading}
                      placeholder="*If blank it will be auto generated*"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    How does your story begin?? Example: {"<character>"} the
                    knight from the kingdom goes to...
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 md:col-span-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="*If blank it will be auto generated*"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Story
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="categoryId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-primary text-white">
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category for your story
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-center">
            <Button size="lg" disabled={isLoading} onClick={setDescValue}>
              Create your Adventure!
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
