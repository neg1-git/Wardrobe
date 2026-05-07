-- Add cost field to clothing_items table
ALTER TABLE clothing_items ADD COLUMN IF NOT EXISTS cost DECIMAL(10,2);