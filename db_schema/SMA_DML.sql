-- Insert master data into event_value_type table

INSERT INTO event_value_type (event_value_type_id, event_value_type_name)
     VALUES (1, 'String');

INSERT INTO event_value_type (event_value_type_id, event_value_type_name)
     VALUES (2, 'Numeric');


-- Insert category data into category table

INSERT INTO category (category_id, category_name)
     VALUES (1, 'Viewability');

INSERT INTO category (category_id, category_name)
     VALUES (2, 'Completion');

-- Insert sub_category data into sub_category table

INSERT INTO sub_category (sub_category_id, sub_category_name, category_id)
     VALUES (1, 'Geometric', 1);

INSERT INTO sub_category (sub_category_id, sub_category_name, category_id)
     VALUES (2, 'Demographic', 1);
