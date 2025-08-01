import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Send } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    description: ""
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || formData.rating === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and provide a rating.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await api.submitTestimonial(formData.name, formData.rating, formData.description);
      
      toast({
        title: "Thank you!",
        description: "Your feedback has been submitted successfully.",
      });

      // Reset form
      setFormData({
        name: "",
        rating: 0,
        description: ""
      });
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isActive = starValue <= (hoveredRating || formData.rating);
      
      return (
        <Star
          key={index}
          className={`w-5 h-5 cursor-pointer transition-all duration-200 ${
            isActive 
              ? "text-yellow-400 fill-yellow-400 scale-110" 
              : "text-gray-300 hover:text-yellow-200"
          }`}
          onClick={() => handleRatingClick(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
        />
      );
    });
  };

  return (
    <div className="mt-8">
      <Card className="border-0 shadow-elegant animate-fade-in h-fit">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-foreground">
            Share Your Experience
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Rate our services
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="h-10"
                required
              />
            </div>

            <div>
              <div className="flex justify-center gap-1 mb-2">
                {renderStars()}
              </div>
              {formData.rating > 0 && (
                <p className="text-xs text-muted-foreground text-center">
                  {formData.rating} star{formData.rating > 1 ? 's' : ''}
                </p>
              )}
            </div>

            <div>
              <Textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Your feedback..."
                className="min-h-20 resize-none text-sm"
                required
              />
            </div>

            <Button 
              type="submit"
              variant="hero" 
              size="sm" 
              className="w-full group"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
              <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackForm;