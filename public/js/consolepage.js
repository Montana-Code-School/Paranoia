var inSignUp = false;
var inLogin = false;

var sendToServer = function(term) {
    var data = {
        email: savedEmail, 
        password: savedPassword, 
        handle: savedHandle
    };
    jQuery.get("/")
    .done(function (data){

        if(data != null){
            term.echo('Success! Welcome back, Agent.');
        } else {
            term.echo(email + " didn't work!");
        }
    }).fail(function(res){
        term.echo(command + "Sorry. Our super-secret servers are currently down.");
    });
    
};


var rules = function(term) {
    term.echo('\nGoal: Be the last agent standing.\n' + 
        '\nHow to play: Each agent will be assigned one target to eliminate, and each agent will in turn be\n'+ 
        'pursued by another player. As no one knows who else may be playing, secrecy and stealth are\n' + 
        'paramount. (To maintain a low profile, be discreet when eliminating your target, and think twice \n' + 
        'before casually discussing the game with others.)  All games begin and end at midnight.\n\n' +  
        'Eliminations:  When you eliminate an agent they will surrender their badge number to you. Enter\n' +
        'this number on your profile page to confirm the deed and receive your new target.  Follow the\n' + 
        'same proceedure if you are eliminated. (Note: Your badge number is assigned when you sign up.\n' + 
        'It can be found at the top of your profile page.)\n\n' +
        'Rules: No weapons of any kind are allowed. Players are eliminated by touching with fingers.\n' + 
        'To maintain your cover, all eliminations must be covert. You may not enter a dorm room uninvited.\n' + 
        'All areas of campus are fair game except the following: classrooms, the library, and a\n' +
        'player’s place of employment.\n\n' +
        'Keep in mind this is a game that rewards sneakiness and vigilance. Keep your identity concealed.\n' + 
        'The winner gets full bragging rights within the Paranoia community. Play fair; don’t cheat.\n' +
        'Above all, HAVE FUN!!' + 
        '\n\nTo join the game click the Sign Up/Sign In button below.');
}



jQuery(document).ready(function($) {
    var id = 1;
    $('#console').terminal(function(command, term) {
        if (inSignUp && savedEmail === null) {
            savedEmail = command;
            term.set_prompt('Agent login: Enter your top-secret password: ');
        } else if (inSignUp && savedPassword === null) {
            savedPassword = command;
            term.set_prompt('Agent login: Enter your top-secret handle: ');

        } else if (inSignUp && savedHandle === null) { 
            savedHandle = command;
            sendToServer(term);
            term.set_prompt('~$');
            term.echo('Welcome to your profile, Agent ' + savedHandle + '.');
            term.echo('');
            term.echo('');
            term.echo('');
            term.echo('');
            term.echo('Type \'profile\' to view your dossier.');

        } else if (inLogin && savedHandle === null) {
            loginHandleCheck(); 
        } else if (inLogin && savedPassword === null) {
            term.set_prompt('Agent login: Enter your top-secret password: ');
            savedPassword = command;
            term.set_prompt('Agent login: Enter your top-secret password: ');
            loginServer(term);
            term.set_prompt('~$');
            term.echo('Welcome back, Agent ' + savedHandle + '.');
        } else if (command == 'help') {
            help(term);
        } else if (command == 'profile') {
            profile(term);
        } else if (command == 'rules') {
            rules(term);      
        } else if (command == 'signup') {
            signup(term);
        } else if (command == 'login') {
            login(term);
        } else if (command == 'letmein') {
            login(term);
        } else {
            term.echo("Unknown command " + command);
        }
    }, {
        greetings: "Greetings. Would you like to play a game?\n" + 
        "\nA word of warning before you agree: know that this is no ordinary game.  It is not for the\n" + 
        "faint of heart.  Paranoia rewards stealth, secrecy and cunning.  Upon admission, you will enter\n" + 
        "a clandestine world of secret agents bent on your destruction. However, as you are pursued, \n" +
        "so shall you pursue.  Your goal is to be the last agent standing.  The thrill of the chase is\n" + 
        "its own reward." + 
        "\n\nTo accept the challenge and join our secret society, type 'signup'. " +
        "\n\nTo learn more about the game, type 'rules'. ",
        onBlur: function() {
            // prevent loosing focus
            return false;
        }
    });
});