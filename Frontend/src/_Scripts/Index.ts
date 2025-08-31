export {Start}

function Start(): void {
    const testimonialReel: TestimonialReel = new TestimonialReel();
    SetupQuoteData(testimonialReel);

}

function SetupQuoteData(reel: TestimonialReel): void {
    const quotes: QuoteData[] = [
        {
            quote: "Efficient, reliable, and user-friendly.",
            author: "Fiora Fernan",
            source: "Facebook"
        },
        {
            quote: "Boindy made my workflow so much smoother. I can't imagine going back to the old way of doing things.",
            author: "Alex Kim",
            source: "Twitter"
        },
        {
            quote: "The support team was incredibly helpful and responsive. Highly recommended!",
            author: "Morgan Lee",
            source: "LinkedIn"
        },
        {
            quote: "A fantastic experience from start to finish. The interface is intuitive and easy to use.",
            author: "Jamie Patel",
            source: "Google Reviews"
        },
        {
            quote: "Boindy exceeded my expectations. The features are exactly what I needed for my project.",
            author: "Chris Jordan",
            source: "Product Hunt"
        }
    ];
    reel.SetQuotes(quotes);
}

interface QuoteData {
    quote: string;
    author: string;
    source: string;
}

class TestimonialReel {
    card: HTMLDivElement;
    quote: HTMLParagraphElement;
    author: HTMLSpanElement;
    source: HTMLSpanElement;

    data: QuoteData[] = [];
    currentIndex: number = 0;
    
    constructor() {
        this.card = document.getElementById('testimonial-card') as HTMLDivElement;
        this.quote = this.card.querySelector("p") as HTMLParagraphElement;
        this.author = document.getElementById('testimonial-author') as HTMLSpanElement;
        this.source = document.getElementById('testimonial-source') as HTMLSpanElement;

        this.BindInteractions();
    }

    SetQuotes(data: QuoteData[]): void {
        this.data = data;
        this.AddPoints();
        this.UpdateInfo();
    }

    private BindInteractions(): void {
        const nextButton: HTMLButtonElement = document.getElementById('next-quote-button') as HTMLButtonElement;
        const previousButton: HTMLButtonElement = document.getElementById('previous-quote-button') as HTMLButtonElement;
        
        const interaction = (indexAdjustment: any) => {
            const points: HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName('testimonial-reel-point') as HTMLCollectionOf<HTMLDivElement>;

            points[this.currentIndex].classList.remove('current-point');
            indexAdjustment();
            points[this.currentIndex].classList.add('current-point');

            this.card.classList.toggle('card-swap');
            setTimeout(() => {
                this.UpdateInfo()
                this.card.classList.toggle('card-swap');
            }, 400);
        }

        nextButton.addEventListener('click', () => {interaction(() => this.IncrimentIndex())});
        previousButton.addEventListener('click', () => {interaction(() => this.DecrimentIndex())});
    }

    private UpdateInfo(): void {
        this.quote.textContent = this.data[this.currentIndex].quote;
        this.author.textContent = this.data[this.currentIndex].author;
        this.source.textContent = this.data[this.currentIndex].source;
    }

    private IncrimentIndex() {
        if(this.currentIndex + 1 <= this.data.length - 1)
            this.currentIndex++;
        else 
            this.currentIndex = 0;
    }

    private DecrimentIndex() {
        if(this.currentIndex - 1 >= 0)
            this.currentIndex--;
        else
            this.currentIndex = this.data.length - 1;
    }

    //the circular dots
    private AddPoints() {
        const wrapper: HTMLDivElement = document.getElementById('quote-point-wrapper') as HTMLDivElement;

        for(let i: number = 0; i < this.data.length; i++){
            const point: HTMLDivElement = document.createElement("div");
            point.classList.add("testimonial-reel-point");

            if(i === this.currentIndex)
                point.classList.add("current-point");

            wrapper.appendChild(point); 
        }
    }
}


Start();