create type currency as enum ('afn', 'eur', 'all', 'dzd', 'usd', 'aoa', 'xcd', 'ars', 'amd', 'awg', 'aud', 'azn', 'bsd', 'bhd', 'bdt', 'bbd', 'byn', 'bzd', 'xof', 'bmd', 'inr', 'btn', 'bob', 'bov', 'bam', 'bwp', 'nok', 'brl', 'bnd', 'bgn', 'bif', 'cve', 'khr', 'xaf', 'cad', 'kyd', 'clp', 'clf', 'cny', 'cop', 'cou', 'kmf', 'cdf', 'nzd', 'crc', 'hrk', 'cup', 'cuc', 'ang', 'czk', 'dkk', 'djf', 'dop', 'egp', 'svc', 'ern', 'etb', 'fkp', 'fjd', 'xpf', 'gmd', 'gel', 'ghs', 'gip', 'gtq', 'gbp', 'gnf', 'gyd', 'htg', 'hnl', 'hkd', 'huf', 'isk', 'idr', 'irr', 'iqd', 'ils', 'jmd', 'jpy', 'jod', 'kzt', 'kes', 'kpw', 'krw', 'kwd', 'kgs', 'lak', 'lbp', 'lsl', 'zar', 'lrd', 'lyd', 'chf', 'mop', 'mkd', 'mga', 'mwk', 'myr', 'mvr', 'mru', 'mur', 'mxn', 'mxv', 'mdl', 'mnt', 'mad', 'mzn', 'mmk', 'nad', 'npr', 'nio', 'ngn', 'omr', 'pkr', 'pab', 'pgk', 'pyg', 'pen', 'php', 'pln', 'qar', 'ron', 'rub', 'rwf', 'shp', 'wst', 'stn', 'sar', 'rsd', 'scr', 'sll', 'sgd', 'sbd', 'sos', 'ssp', 'lkr', 'sdg', 'srd', 'szl', 'sek', 'che', 'chw', 'syp', 'twd', 'tjs', 'tzs', 'thb', 'top', 'ttd', 'tnd', 'try', 'tmt', 'ugx', 'uah', 'aed', 'usn', 'uyu', 'uyi', 'uyw', 'uzs', 'vuv', 'ves', 'vnd', 'yer', 'zmw', 'zwl');

create table hotels
(
    id   serial not null
        constraint hotels_pk
            primary key,
    name text   not null
);

create table reservations
(
    id             serial                                 not null
        constraint reservations_pk
            primary key,
    uuid           text                                   not null,
    hotel_id       integer
        constraint reservations_hotels_id_fk
            references hotels,
    currency       currency                               not null,
    price          double precision                       not null,
    guest_name     text,
    room_name      text,
    arrival_date   timestamp with time zone               not null,
    nights         integer                                not null,
    insertion_date timestamp with time zone default now() not null
);

create unique index reservations_uuid_uindex
    on reservations (uuid);

INSERT INTO public.hotels (id, name) VALUES (1, 'Leonardo Plaza Ashdod');
INSERT INTO public.hotels (id, name) VALUES (2, 'Rothschild 22');
INSERT INTO public.hotels (id, name) VALUES (3, 'Herods Vitalis Eilat');
INSERT INTO public.hotels (id, name) VALUES (4, 'U Magic Palace');
INSERT INTO public.hotels (id, name) VALUES (5, 'NYX Tel Aviv');