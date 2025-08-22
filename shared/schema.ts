import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  eventDate: text("event_date").notNull(),
  eventTime: text("event_time").notNull(),
  eventType: text("event_type").notNull(),
  venueAddress: text("venue_address").notNull(),
  numberOfGuests: text("number_of_guests").notNull(),
  packageType: text("package_type").notNull(), // "2-hour", "3-hour", "4-hour"
  packagePrice: integer("package_price").notNull(),
  selectedCustomizations: json("selected_customizations"), // Store customization options
  addOns: json("add_ons"), // Store selected add-ons
  totalPrice: integer("total_price").notNull(),
  depositAmount: integer("deposit_amount").notNull(),
  paymentMethod: text("payment_method").notNull(),
  paymentStatus: text("payment_status").notNull().default("pending"),
  bookingStatus: text("booking_status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  eventType: text("event_type").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
}).extend({
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().min(1, "Phone number is required"),
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().min(1, "Event time is required"),
  eventType: z.string().min(1, "Event type is required"),
  venueAddress: z.string().min(1, "Venue address is required"),
  numberOfGuests: z.string().min(1, "Number of guests is required"),
  packageType: z.enum(["2-hour", "3-hour", "4-hour"]),
  packagePrice: z.number().min(1, "Package price is required"),
  totalPrice: z.number().min(1, "Total price is required"),
  depositAmount: z.number().min(1, "Deposit amount is required"),
  paymentMethod: z.enum(["paypal", "venmo", "cashapp", "applepay"]),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
  status: true,
}).extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  eventType: z.string().min(1, "Event type is required"),
  message: z.string().min(1, "Message is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
