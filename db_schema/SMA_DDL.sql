-- Ref: http://www.postgresql.org/docs/9.0/static/sql-commands.html

-- Database: sma
-- Following DDL creates sma database and tables

-- DROP DATABASE IF EXISTS sma;

-- CREATE DATABASE sma
-- CREATE DATABASE sma
-- ENCODING = 'UTF8'
-- CONNECTION LIMIT = -1;

-- partner table
-- It contains details regarding created new partner


CREATE TABLE partner
(
   partner_id            SERIAL
                            CONSTRAINT partner_id_must_be_unique_or_not_null PRIMARY KEY,
   partner_name          text CONSTRAINT partner_name_must_be_not_null NOT NULL,
   partner_logo          text,
   partner_email         text,
   partner_bank_acc_no   text,
   partner_state         text,
   partner_city          text,
   created_by            text, -- stores a logged in user identity (foreign key) who has created this partner
   created_date          timestamp,
   updated_by            text, -- stores a logged in user identity (foreign key) who has updated this partner
   updated_date          timestamp
);


-- partner_data_stream table
-- It contains configured datastream basic details for a partner. One partner has many datastream

CREATE TABLE partner_data_stream
(
   partner_data_stream_id   SERIAL
                               CONSTRAINT partner_data_stream_id_must_be_unique_or_not_null PRIMARY KEY,
   partner_id               integer    REFERENCES partner (partner_id),
   data_stream_name         text
                               CONSTRAINT data_stream_name_must_be_not_null NOT NULL
);

-- category table
-- It contains category master details

CREATE TABLE category
(
   category_id     SERIAL
                      CONSTRAINT category_id_must_be_unique_and_not_null PRIMARY KEY,
   category_name   text CONSTRAINT category_name_must_be_not_null NOT NULL
);

-- sub_category table
-- It contains sub category master details

CREATE TABLE sub_category
(
   sub_category_id     SERIAL
                          CONSTRAINT sub_category_id_must_be_unique_and_not_null PRIMARY KEY,
   sub_category_name   text
                          CONSTRAINT sub_category_name_must_be_not_null NOT NULL,
   category_id         integer    REFERENCES category (category_id)
);

-- event_value_type table
-- It contains event's value type master details

CREATE TABLE event_value_type
(
   event_value_type_id     SERIAL
                              CONSTRAINT event_value_type_id_must_be_unique_and_not_null PRIMARY KEY,
   event_value_type_name   text
                              CONSTRAINT event_value_type_name_must_be_not_null NOT NULL
);

-- partner_ds_header_conf table
-- It contains details for a partner datastream event configuration

CREATE TABLE partner_ds_header_conf
(
   partner_ds_header_conf_id   SERIAL
                                  CONSTRAINT partner_ds_header_conf_id_must_be_unique_and_not_null PRIMARY KEY,
   partner_id                  integer    REFERENCES partner (partner_id),
   partner_data_stream_id      integer

                                     REFERENCES partner_data_stream (partner_data_stream_id),
   category_id                 integer    REFERENCES category (category_id),
   sub_category_id             integer

                                     REFERENCES sub_category (sub_category_id),
   created_date                timestamp
);

-- event_category table
-- It contains datastream event categories details created for a partner

CREATE TABLE event_category
(
   event_category_id           SERIAL
                                  CONSTRAINT event_category_id_must_be_unique_and_not_null PRIMARY KEY,
   event_category_name         text
                                  CONSTRAINT event_category_name_must_be_not_null NOT NULL,
   event_value_type_id         integer

                                     REFERENCES event_value_type (event_value_type_id),
   partner_ds_header_conf_id   integer

                                     REFERENCES partner_ds_header_conf (partner_ds_header_conf_id)
);
