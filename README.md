# Node Session Auth 1 Guided Project using express-session and pass session id from server to client in cookie

Guided project for **Node Auth 1** Module.

Pro: server can terminate session to enforce client logout by removing session cookie.

Con: servers can not scale up horizontally because each session cookie is tied to each particular server and can not be shared across servers.

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type `npm i` to download dependencies.
- [ ] type `npm run server` to start the API.

Authentication is the process by which our Web API verifies the identity of a client that is trying to access a resource. This is different from authorization, which comes after authentication and determines what type of access, if any, that a user should have.

Adding authentication to a Web API requires that an API can:

register user accounts.
login to prove identity.
logout of the system to invalidate the user’s access until they login again.
add a way for users to reset their passwords.
Proper authentication is difficult. There is a constant race between security experts coming up with innovative ways to protect our information and attackers coming up with ways to circumvent those security measures.

Some of the things we need to take into account when implementing authentication are:

Password storage.
Password strength.
Brute-force safeguards.
Follow Along
Let’s tackle the first one, password storage. The rule of thumb is: NEVER, EVER, under no circumstances, store user passwords in plain text. Then what are the two main options:

encryption.
hashing.
Password Hashing vs. Encryption for password storage
Encryption goes two ways. First, it utilizes plain text and private keys to generate encrypted passwords and then reverses the process to match to an original password.
Cryptographic hashes only go one way: parameters + input = hash. It is pure; given the same parameters and input it generates the same hash.
If the database of users and keys are compromised, it is possible to decrypt the passwords to their original values, and this is bad because users often share passwords across different sites. This is one reason why cryptographic hashing is the preferred method for storing user passwords.

Password Strength
Password length alone is not enough to slow password guessing, but in general, long passwords are better than short, complicated passwords. It is a trade-off between convenience and security.

Visit this site to see how a combination of password length and complexity affects an attacker’s ability to pre-generate password hashes.

Brute-Force Attack Mitigation
A common way that attackers circumvent hashing algorithms is by pre-calculating hashes for all possible character combinations up to a particular length using common hashing techniques. The results of said calculations are stored into a database table known as a rainbow table. Whenever there is a breach, the attacker checks every breached password against their table.

Which Cryptographic Hashing Algorithm should we use? MD5, SHA-1, SHA-2, SHA-3? None of these, because they are flawed, these algorithms are optimized for speed, not security.

We aim to slow down hackers’ ability to get at a user’s password. To do so, we are going to add time to our security algorithm to produce what is known as a key derivation function.

[Hash] + [Time] = [Key Derivation Function].

In the next section, we’ll learn how to use a popular Key Derivation library to store user passwords safely.

Challenge
Write a paragraph that explains the difference between authentication and authorization and send it to your PM on slack.

Dig Deeper
OWASP Top 10
Plain Text Offenders
A list of websites storing passwords as plain text.
The Seif Project
bcrypt defined
Learn to hash passwords before saving them to the database
When storing a user’s password into a database we must ensure that they are not saved as plain text. The reasons are obvious and yet, we have heard of big companies like t-mobile not doing this.

In this section we’ll learn how to save passwords in a secure manner.

Overview
Instead of writing our own key derivation function (fancy name for hashing function), we’ll use a well known and popular module called bcryptjs. This module is well supported and stable, but there are other options you can explore.

Bcryptjs features include:

password hashing function.
implements salting both manually and automatically.
accumulative hashing rounds.
Having an algorithm that hashes the information multiple times (rounds) means an attacker needs to have the hash, know the algorithm used, and how many rounds were used to generate the hash in the first place.

Follow Along
Follow these steps to use bcrypt in your project.

Install bcryptjs using npm.

Import it into your server.

Copy
const bcrypt = require('bcryptjs');
To hash a password:

Copy
const credentials = req.body;

const hash = bcrypt.hashSync(credentials.password, 14);

credentials.password = hash;

// move on to save the user.
To verify a password:

Copy
const credentials = req.body;

// find the user in the database by it's username then
if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
  return res.status(401).json({ error: 'Incorrect credentials' });
}

// the user is valid, continue on

Use bcrypt.compareSync(), passing the password guess in plain text and the password hash from the database to validate credentials.

If the password guess is valid, the method returns true. Otherwise, it returns false. The library hashes the password guess first and then compare the hashes.
