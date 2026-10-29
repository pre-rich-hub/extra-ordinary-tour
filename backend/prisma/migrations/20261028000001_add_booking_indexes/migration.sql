-- Dashboard aggregates scan bookings by creation date and group by tour.
CREATE INDEX "bookings_tour_id_idx" ON "bookings"("tour_id");
CREATE INDEX "bookings_created_at_idx" ON "bookings"("created_at");
