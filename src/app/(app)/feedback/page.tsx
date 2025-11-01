import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function FeedbackPage() {
    
    async function submitFeedback(formData: FormData) {
        "use server";
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const feedback = formData.get("feedback") as string;
        
        // Simulate API call
        console.log("Feedback Received:", { name, email, feedback });
        await new Promise(res => setTimeout(res, 1000));

        // In a real app, you would handle success/error states properly
        // For now, we'll just return a success state.
        return { success: true };
    }

    const handleFormAction = async (formData: FormData) => {
        const result = await submitFeedback(formData);
        if (result.success) {
            toast({
                title: "Feedback Submitted",
                description: "Thank you! We appreciate you taking the time to share your thoughts.",
            });
        } else {
             toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Feedback</CardTitle>
        <CardDescription>
          Have a suggestion or encountered an issue? Let us know.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleFormAction} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              id="feedback"
              name="feedback"
              placeholder="Please provide your detailed feedback here..."
              required
              rows={6}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
