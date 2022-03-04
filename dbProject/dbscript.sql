USE master;
GO

create database freesys;
Go

use freesys;
Go

create table StatusDetails(
	status_id int primary key identity(1,1), 
	status_name varchar(20));
GO

create table UserType(
	user_type_id int primary key identity(1,1), 
	user_type varchar(20));
GO

create table SkillLevel(
	skill_level_id int primary key identity(1,1), 
	skill_name varchar(20));
GO

create table Registration (
	registration_id int primary key identity(1,1), 
	user_type_id int references UserType(user_type_id), 
	first_name varchar(15), 
	last_name varchar(15), 
	email varchar(30), 
	password varchar(40), 
	registration_date DateTime, 
	gender varchar(10), 
	status_id int references StatusDetails(status_id));
GO

create table Country(
	country_id int primary key identity(1,1), 
	country_name varchar(20));
GO

create table Currency(
	currency_id int primary key identity(1,1),
	country_id int references Country(Country_id),
	country_name varchar(20));
GO

create table StateDetails(
	state_id int primary key identity(1,1), 
	country_id int references Country(Country_id), 
	state_name varchar(20));
GO


create table City(
	city_id int primary key identity(1,1), 
	country_id int references Country(Country_id), 
	city_name varchar(20),
	state_id int references StateDetails(state_id));
GO

create table EmployerProfile(
	employer_id int primary key identity(1,1),
	registration_id int references Registration(Registration_id),
	profile_image varchar(100), 
	company_name varchar(30), 
	city_id int references City(City_id), 
	country int references Country(Country_id), 
	mobile_no numeric(10,0));
GO

create table FreelancerProfile (
	freelancer_id int primary key identity(1,1), 
	registration_id int references Registration(Registration_id), 
	profile_image varchar(100), 
	hourly_rate decimal(5,2), 
	city_id int references City(City_id), 
	country int references Country(Country_id), 
	mobile_no numeric(10,0));
GO

create table Projects (
	project_id int primary key identity(1,1),
	employer_id int references EmployerProfile(employer_id), 
	project_name varchar(100), 
	duration int, 
	project_description varchar(250), 
	attachment varchar(100), 
	post_date DateTime, 
	completion_date  DateTime, 
	status_id int references StatusDetails(status_id));
GO

create table Bids(
	bid_id int primary key identity(1,1),
	project_id int references Projects(project_id), 
	freelancer_id int references FreelancerProfile(freelancer_id), 
	amount decimal(8,2), 
	bid_date DateTime, 
	delivery_time int, 
	status_id int references StatusDetails(status_id) );
GO

create table Task(
	task_id int primary key identity(1,1), 
	project_id int references Projects(project_id), 
	task_name varchar(50), 
	task_description varchar(250), 
	start_date DateTime, 
	end_date DateTime, 
	attachment varchar(100), 
	post_date DateTime, 
	payment_status int references StatusDetails(status_id), 
	min_budget decimal(5,2), 
	max_budget decimal(5,2), 
	status_id int references StatusDetails(status_id));
GO

create table MemberShip(
	plan_id int primary key identity(1,1),
	duration int,
	plan_name varchar(30),
	amount decimal(8,2),
	post_limit int,
	bid_limit int,
	user_type_id int references UserType(user_type_id));
GO

create table PaymentDetails(
	payment_id int primary key identity(1,1),
	txn_date DateTime,
	txn_no varchar(20),
	amount decimal(8,2)
);
GO

create table SubscribersDetails(
	sub_id int primary key identity(1,1),
	registration_id int references Registration(registration_id),
	plan_id int references Membership(plan_id),
	start_date DateTime,
	payment_id int references PaymentDetails(payment_id),
	status_id int references StatusDetails(status_id)
);
GO

create table Skills(
	skill_id int primary key identity(1,1),
	skill_name varchar(20)
);
GO

 create table ProjectSkills(
	skill_id int references Skills(skill_id),
	project_id int references Projects(project_id),
	skill_level_id int references SkillLevel(Skill_level_id),
	constraint pk_pskill primary key(skill_id, project_id)
 );
 GO

 create table FreelancerSkills(
	skill_id int references Skills(skill_id),
	freelancer_id int references FreelancerProfile(freelancer_id),
	skill_level_id int references SkillLevel(Skill_level_id),
	constraint pk_fskill primary key(skill_id, freelancer_id)
 );
 GO

 /*StatusDetails*/
insert into StatusDetails values('complete'),('partial'),('cancelled'),('failed'),('active'),('placed'),('accepted'),('rejected'),('inactive'),('verified'),('not verified'),('terminated');
 GO

/*UserType*/
insert into UserType values('Admin'),('Freelancer'),('Employer')
 GO

/*SkillLevel*/
insert into SkillLevel values('beginer'),('intermediate'),('expert')
 GO

--/*Registration*/
insert into Registration values(2,'Aakash','Maurya','aakash@gmail.com','aakash@101','03-03-2022','MALE',10)
insert into Registration values(2,'Jayesh','Dhumadiya','jayesh@gmail.com','jayesh@102','03-03-2022','MALE',11)
insert into Registration values(2,'Hinal','Lukhi','Hinal@gmail.com','hinal@103','02-03-2022','FEMALE',10)
 GO



insert into Registration values(3,'Sweta','Jaiswal','sweta@gmail.com','sweta@104','01-03-2022','FEMALE',10)
insert into Registration values(3,'Shubham','Misra','shubham@gmail.com','shubahm@105','2022-02-28','MALE',12)
insert into Registration values(3,'Kapil','Bardoliya','Kapil@gmail.com','kapil@106','2022-02-26','MALE',10)
 GO


insert into Registration values(1,'Admin','Admin','Admin@gmail.com','Admin@Admin','01-03-2022','MALE',10)
 GO

--/*Country*/
insert into Country values('india'),('south africa'),('usa'),('japan'),('canada'),('uk')
 GO

--/*Currency*/

--insert into Currency values(1,'rupee'),(2,'rand'),(3,'dollar'),(4,'yen'),(5,'canadian dollar'),(6,'pound');
-- GO

--/*state*/
insert into StateDetails values(1,'gujarat'),(1,'UP'),(2,'johannesburg'),(2,'capetown'),(3,'callifornia'),(3,'virginia'),(4,'hokkaido'),(4,'nara');
 GO

--/*City*/
insert into City values(1,'surat',1),(1,'Ahemdabad',1),(2,'durbon',2),(2,'pretoria',2);
 GO

--/*Employer profile*/

insert into EmployerProfile values(4,'image/path','kapil enterprise',1,1,8486593285),(5,'image/path','shubham enterprise',1,1,8486593285)
 GO

--/*Freelancer*/
insert into FreelancerProfile values(1,'image/path',15,1,1,8486593285),(2,'image/path',15,1,1,9856947414),(3,'image/path',25,2,3,7896548523);
 GO

insert into Projects values(1,'Online Ticker Booking System',30,'Project for online railway ticket booking','image/path','2022-12-05','2022-01-04',5)
insert into Projects values(2,'Online Property Rent',60,'Rent Property Online','image/path','2022-02-01','2022-04-02',5)
insert into Projects values(1,'Online Cab Booking',30,'Rent Property Online','image/path','2022-02-01','2022-04-02',5)

GO

insert into Task values(1,'project task', 'Whole project', '2022-12-07', '2023-01-02', 'path to file', '2023-12-05', 1, 150, 200, 5),
	(2,'backend', 'project backend', '2022-02-01', '2022-02-10', 'path to file', '2022-02-01', 2, 150, 250, 5),
	(2,'frontend', 'project frontend', '2022-02-01', '2022-03-15', 'path to file', '2022-02-01', 2, 150, 250, 5);
GO

insert into Bids values(1, 1, 170, '2022-12-08', 30, 6),
	(1, 2, 160, '2022-12-10', 15, 6),
	(1, 3, 165, '2022-12-08', 30, 7),
	(2, 1, 470, '2022-12-08', 45, 6),
	(2, 3, 170, '2022-12-08', 70, 7);
GO

insert into MemberShip values (90, 'premium', 300, 15, 0, 3),
								(90, 'pro',200,10,0,3),(90, 'basic',200,5,0,3),
								(90, 'premium',300,0,15,2),(90, 'pro',200,0,10,2),(90, 'basic',100,0,5,2);
					
GO

insert into PaymentDetails values('2022-01-01','206219230113',100),('2022-01-01','206219230115',200),('2022-01-01','206216540113',300);
GO

insert into SubscribersDetails values(1,1,'2021-01-01',1,1),(2,2,'2021-01-01',2,5);
GO

insert into Skills values('PHP'),('JAVA'),('COREJAVA'),('ANGULAR'),('REACTJS');
GO

insert into ProjectSkills values(1,1,1),(2,1,2),(3,1,3),(4,2,1),(5,2,2),(1,2,3);
GO

insert into FreelancerSkills values(1,1,1),(2,2,2),(3,3,3);
GO