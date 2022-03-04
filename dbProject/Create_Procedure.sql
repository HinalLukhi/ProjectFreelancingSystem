CREATE OR ALTER PROCEDURE FreelancerBidsInfo @freelancer_id int,@status_name varchar(20)
AS
select * 
from FreelancerProfile as fp, Bids as b,StatusDetails as s
where fp.freelancer_id = b.freelancer_id AND b.status_id=s.status_id AND s.status_name=@status_name AND fp.freelancer_id=@freelancer_id



/*
EXEC FreelancerBidsInfo @freelancer_id =3,@status_name="accepted";
*/

CREATE or ALTER FUNCTION ufdcount_subscribers(@Plan_ID int)
returns int
AS
BEGIN
	DECLARE @cnt int
	select @cnt=count(sub_id) from SubscribersDetails sd,MemberShip m
	where sd.plan_id=m.plan_id and m.plan_id = @Plan_ID

	return @cnt
END
GO

/*
select [dbo].ufdcount_subscribers(2) as CountMember;

exec ufdcount_subscribers 1;
*/


CREATE OR ALTER VIEW DisplayFreelancerInfo AS 
select fp.freelancer_id,fp.profile_image,p.project_id,p.project_name,t.start_date,t.min_budget,b.amount,b.bid_date
from FreelancerProfile fp,Task t,Bids b,Projects p
where fp.freelancer_id=b.freelancer_id AND p.project_id=b.project_id AND  p.project_id=t.project_id 
GO

/*select * from DisplayFreelancerInfo;*/