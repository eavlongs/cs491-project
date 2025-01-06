import { SeatSelectionCard } from "@/components/custom/seat-selection";

export default function SelectSeatsPage() {
    return (
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="container mx-auto py-10">
                <SeatSelectionCard
                    movieTitle="JoJo Bizze Adventure"
                    showTime="21:00"
                    showDate="Sun, 22 Dec"
                    hallName="Hall A"
                    seatPrice={3.5}
                />
            </div>
        </div>
    );
}
