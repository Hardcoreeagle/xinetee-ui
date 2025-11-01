"use server";

export async function submitFeedback(formData: FormData) {
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
