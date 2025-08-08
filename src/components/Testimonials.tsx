import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { api } from "@/lib/api";

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  description: string;
  created_at: string;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await api.getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Failed to load testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading testimonials...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/50">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16 animate-fade-in px-4">
   <div className="inline-flex items-center px-6 py-3 bg-accent/20 rounded-full mb-6 transition-all duration-1000">
  <span className="text-black font-semibold text-base sm:text-lg animate-text-glow">
    ⭐ Testimonials
  </span>
</div>

         <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
  <span className="bg-gradient-to-r from-purple-800 via-purple-900 to-purple-950 bg-clip-text text-transparent">
    What Our
  </span>{" "}
  <span className="bg-gradient-to-r from-purple-800 via-purple-900 to-purple-950 bg-clip-text text-transparent">
    Clients Say
  </span>


          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Don't just take our word for it. Here's what our satisfied clients have to say about 
            our IT solutions and services.
          </p>
        </div>

        {/* Testimonials Grid */}
        {testimonials.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id}
                className="border-0 shadow-elegant hover:shadow-primary transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-accent opacity-60" />
                    <div className="flex gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  
                  <blockquote className="text-foreground mb-4 sm:mb-6 leading-relaxed italic text-sm sm:text-base">
                    "{testimonial.description}"
                  </blockquote>
                  
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm sm:text-lg">
                        {testimonial.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-foreground text-sm sm:text-base">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {new Date(testimonial.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long'
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Quote className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-lg">No testimonials available yet.</p>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Testimonials;