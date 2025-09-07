create table if not exists problems(
    id varchar(10) primary key,
    p_language varchar(10) not null check(p_language in ('java', 'python', 'c', 'cpp', 'js', 'dart', 'go', 'sql')),
    section_name varchar(10) not null,
    chapter_id int not null,
    problem_name varchar(100) not null,
    time_limit int not null default 2,
    timeout int not null default 5,
    constraint time_less_out check(time_limit < timeout)
);

create table if not exists test_cases(
    id serial primary key,
    problem_id varchar(10) not null,
    test_type varchar(10) not null default 'match' check(test_type in ('exclude', 'include', 'match')),
    input_text text default null,
    output_text text not null,
    constraint fk_problems foreign key (problem_id) references problems(id) on delete cascade
);