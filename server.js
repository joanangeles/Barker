var express = require('express');
var mysql = require('mysql');
var app = express();
var path = require('path');
var nodemon = require('nodemon');
var session = require('express-session')
const port = 3000;

app.use('/bootstrap-3.3.7-dist',express.static(path.join(__dirname, 'bootstrap-3.3.7-dist')))
app.use('/Angular',express.static(path.join(__dirname, 'Angular')))
app.use('/control',express.static(path.join(__dirname, 'control')))

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/Photos',express.static(path.join(__dirname, 'Photos')));

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'admin',
	database: 'barker'
});

app.use(session({
    secret: 'cmsc100barker',
    resave: true,
    saveUninitialized: true
}));

var auth = function(req, res, next) {
  if (req.session)
    return next();
  else
    return res.sendStatus(401);
};

app.get('/loginCheck',function(req,res){
  var body = req.query;
  console.log(body);
  connection.query('select * from user where username = ? and password = ?',[body.username,body.password], function(err, rows, fields) {
    rows.forEach(function(row){
      req.session.userid = row.userId;
    })
        if (!err) {
            req.session.username = body.username;  
            res.send(rows);
         }
        else {
            res.send(err)
        }
    })
})


app.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect('/');
})

app.get('/',function(req,res){
  res.sendFile(__dirname + '/login.html');

});

app.get('/barker', function(req,res){
	res.sendFile(__dirname + '/home.html');
  console.log(req.session.username);
  console.log(req.session.userid + 'yay')

});

app.get('/barker_profile/other/:id', function(req,res){
  res.sendFile(__dirname + '/otherUserProfile.html');
});

app.get('/barker_profile/other/:id/following', function(req,res){
  res.sendFile(__dirname + '/otherUserFollowing.html');
});

app.get('/barker_profile/other/:id/follower', function(req,res){
  res.sendFile(__dirname + '/otherUserFollower.html');
});

app.post('/barker/editbark/:id', function(req,res){
	console.log(req.params.id);
});

app.get('/barker_profile', function(req,res){
	res.sendFile(__dirname + '/twitter_profile.html');
});

app.get('/barker_following', function(req,res){
	res.sendFile(__dirname + '/following.html');
});

app.get('/barker_follower', function(req,res){
	res.sendFile(__dirname + '/follower.html');
});



//>>>>>>>> SHOWS BARKS OF THE USER

app.get('/barker/barks/:userid', function(req, res) {
  console.log("aaaaaaaaaaaaaaaa" + req.params.userid);
  connection.query("select user.name as name, user.username as username, tweet.tweetContent, year(tweet.timeStamp) as year, day(tweet.timeStamp) as day, month(tweet.timeStamp) as month,tweet.tweetId as tweetId,tweet.authorId as authorId, tweet.numberOfLikes as numberOfLikes from tweet,user where tweet.authorId = "+req.params.userid+" and user.userId = "+req.params.userid+" and tweet.parentTweet is NULL order by tweetId desc", function(err, rows, fields) {
    if (!err) {
      res.send(rows)
    }
  });
  
});

app.get('/barker/barks/', function(req, res) {
  connection.query("select user.name as name, user.username as username, tweet.tweetContent, year(tweet.timeStamp) as year, day(tweet.timeStamp) as day, month(tweet.timeStamp) as month,tweet.tweetId as tweetId, tweet.numberOfLikes as numberOfLikes from tweet,user where tweet.authorId = "+req.session.userid+" and user.userId = "+req.session.userid+" and tweet.parentTweet is NULL order by tweetId desc", function(err, rows, fields) {
    if (!err) {
      res.send(rows)
    }
  });
  
});


//>>>>>>>>>> SHOWS BARKS OF OTHER USERS

app.get('/barker/otherbarks/', function(req, res) {

  connection.query("select user.name as name, user.username as username, tweet.tweetContent, year(tweet.timeStamp) as year,tweet.authorId as authorId, day(tweet.timeStamp) as day, month(tweet.timeStamp) as month,tweet.tweetId as tweetId, tweet.numberOfLikes as numberOfLikes from tweet,user,userfollowed where tweet.authorId=user.userId and tweet.authorId != "+req.session.userid+" and user.userId != "+req.session.userid+" and userfollowed.userId = "+req.session.userid+" and userfollowed.followedId = tweet.authorId and tweet.parentTweet is NULL order by tweet.tweetId desc", function(err, rows, fields) {
    if (!err) {
      res.send(rows)
    }
  });
  
});

app.get('/name', function(req, res) {
    connection.query("Select username from user where userId="+req.session.userid, function(err, rows, fields) {
        if (!err) {
            res.send(rows)
        }
    });
});

app.get('/barker/mySelf',function(req,res){
  connection.query("select * from user where userid = "+req.session.userid+"; ",function(err,rows,fields){
    if (!err) {
      res.send(rows)
    }
  })

});


app.get('/barker/otherProf/:userid',function(req,res){
  connection.query("select user.*, count(*) as followed from user,userfollowed where user.userid = "+req.params.userid+" and userfollowed.userId = "+req.session.userid+" and userfollowed.followedId = "+req.params.userid+"; ",function(err,rows,fields){
    if (!err) {
      res.send(rows)
    }
  })

});

app.post('/barker/barks/like/:x',function(req,res){
  console.log("call likeTweet("+req.params.x+","+req.session.userid+")");
  connection.query("call likeTweet("+req.params.x+","+req.session.userid+")",function(err,rows,fields){
        res.end()
    
  })
})

app.get('/barker/getNumofLikes/:tweetId', function(req,res){
  connection.query("select count(*) as count from tweetLikes where tweetId ="+req.params.tweetId+" ;", function(err,rows,fields){
    res.send(rows);
  })

});


//>>>>>>>>> CREATE A BARK

app.post('/barker/bark/create', function(req, res) {
    connection.query('INSERT INTO tweet (tweetContent, authorId) VALUE (?,?)',[req.body.tweetContent,req.session.userid], function(err, rows, fields) {
        if (err) {
            console.log(err)
         }
        else {
            res.send('Successfully added')
        }
    })
})


//>>>>>>> UPDATE A BARK

app.post('/barker/bark/edit', function(req, res) {
    console.log(req.body.tweetContent);
    connection.query('UPDATE tweet set tweetContent="'+req.body.tweetContent+'" where tweetId='+ req.body.tweetId, function(err, rows, fields) {
        if (err) {
            console.log(err)
         }
        else {
            res.send('Successfully updated')
        }
    })  
})


//>>>>>>>>>> DELETE A BARK

app.post('/barker/bark/delete/:tweetId', function(req, res) {
    connection.query('call deleteBark('+req.params.tweetId+')', function(err, rows, fields) {
        if (err) {
            console.log(err)
         }
        else {
            res.send('Successfully deleted')
        }
    })
})


//>>>>>>>>> SHOWS COMMENTS

app.get('/barker/barks/comments/:username/tweetId/:tId', function(req, res) {
  console.log(req.params.username, req.params.tId);
    connection.query("select user.name as sssname, user.username as username, tweet.tweetContent,tweet.numberOfLikes,tweet.tweetId, year(tweet.timeStamp) as year, day(tweet.timeStamp) as day, month(tweet.timeStamp) as month from tweet,user where tweet.authorId = user.userId and parentTweet = "+req.params.tId+" ", function(err, rows, fields) {
    if (!err) {
      res.send(rows)
    }
  });
    console.log("select user.name as sssname, user.username as username, tweet.tweetContent,tweet.numberOfLikes, year(tweet.timeStamp) as year, day(tweet.timeStamp) as day, month(tweet.timeStamp) as month from tweet,user where tweet.authorId = user.userId and parentTweet = "+req.params.tId+" ")
})


//>>>>>>>>>> ADD COMMENTS

app.post('/barker/bark/comment/create', function(req, res) {
    connection.query('INSERT INTO tweet (tweetContent, authorId, parentTweet) VALUE (?,?,?)',[req.body.tweetContent,req.session.userid,req.body.parentTweet], function(err, rows, fields) {

        if (err) {
            console.log(err)
         }
        else {
            res.send('Successfully added')
        }
    })
})


//>>>>>>>>>> SHOWS FOLLOWED USERS

app.get('/barker/following', function(req, res) {
  connection.query("select followedId, name, username from userfollowed left join user on userfollowed.followedId=user.userId where userfollowed.userId="+req.session.userid+"", function(err, rows, fields) {
    if (!err) {
      res.send(rows)
    }
  });
});

app.get('/barker/otherfollowing/:userid', function(req, res) {
  connection.query("select followedId, name, username from userfollowed left join user on userfollowed.followedId=user.userId where userfollowed.userId="+req.params.userid+"", function(err, rows, fields) {
    if (!err) {
      res.send(rows)
    }
  });
});


//>>>>>>>>>> SHOWS FOLLOWER USERS

app.get('/barker/follower/', function(req, res) {
  connection.query("select userfollowed.userId, name, username from userfollowed left join user on userfollowed.userId=user.userId where userfollowed.followedId ="+req.session.userid+"", function(err, rows, fields) {
    if (!err) {
      res.send(rows)
    }
  });
});

app.get('/barker/otherfollower/:userid', function(req, res) {
  connection.query("select userfollowed.userId, name, username from userfollowed left join user on userfollowed.userId=user.userId where userfollowed.followedId ="+req.params.userid+"", function(err, rows, fields) {
    if (!err) {
      res.send(rows)
    }
  });
});


app.post('/barker/follow/user/:id', function (req, res) {
    connection.query("call followUser("+req.session.userid+","+req.params.id+")", function(err, rows, fields) {
        res.end()
    })
})

app.post('/barker/otherfollow/:userId/user/:id', function (req, res) {
    connection.query("call followUser("+req.params.userId+","+req.params.id+")", function(err, rows, fields) {
        res.end()
    })
})

app.get('/berker/follow/followed/:id',function(req,res){
  console.log("select count(*) as followed from userfollowed where userId = "+req.session.userid+" and followedId="+req.params.id+" ");
 connection.query("select count(*) as followed from userfollowed where userId = "+req.session.userid+" and followedId="+req.params.id+" ", function(err, rows, fields) {
    if (!err) {
      console.log("asdasdasdasdasdasdkjasdnas uidkj,nas d");
      res.send(rows)
    }
  })
})

app.get('/berker/otherfollow/:userid/followed/:id',function(req,res){
  console.log("select count(*) as followed from userfollowed where userId = "+req.params.userid+" and followedId="+req.params.id+" ");
 connection.query("select count(*) as followed from userfollowed where userId = "+req.params.userid+" and followedId="+req.params.id+" ", function(err, rows, fields) {
    if (!err) {
      console.log("asdasdasdasdasdasdkjasdnas uidkj,nas d");
      res.send(rows)
    }
  })
})

//>>>>>>> CREATE USER

app.post('/barker/newuser', function (req, res) {
    connection.query('Insert into user (name, username, password, email) values (?,?,?,?)', [req.body.name, req.body.username, req.body.password, req.body.email], function (err, rows, fields) {
        if (err) {
          console.log(err)
        }
        else {
          res.send('Successfully added: ' + req.body.name)
        }
    })
})


app.get('/search-user/:name', function(req, res) {
  connection.query('SELECT * FROM user WHERE name like ? order by name', '%' + req.params.name + '%', function(err, rows, fields) {
    if (!err) {
      res.send(rows)
    }
  })
})


app.get('/barker/edit/:tweetId', function(req, res) {
    connection.query('select tweetContent from tweet where tweetId='+req.params.tweetId, function(err, rows, fields) {
        if (!err) {
          res.send(rows)
        }
    })
})


console.log('Server started at Localhost:'+ port)
app.listen(port);
