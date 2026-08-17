import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { api } from "@/lib/axios";
import { toast } from "sonner";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await api.post("/mail/send", formData);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    }

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
        <CardDescription>
          Tell us about your project and we'll get back to you.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-5">
            {/* Name */}
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
              />
            </Field>

            {/* Email */}
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </Field>

            {/* Message */}
            <Field>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your trading strategy or project..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
              />
            </Field>

            {/* Submit */}
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
