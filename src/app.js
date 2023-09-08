/**
 * Application Instance
 * The instance of the game is initializes and ready to be started.
 */
class App {
    // The matches' payload
    #matches;

    // The win counters
    #win_counts;
    
    // The game's instructions element
    #instructions_el;

    // The game's score element
    #score_el;

    // The game's start button
    #start_button_container_el;
    #start_button_el;

    // The player selection container and options
    #player_selection_container_el;
    #player_selection_options_el;

    // The winner container
    #winner_container_el;

    // The matches container
    #matches_container_el;



    constructor () {
        // Initialize the matches payload
        this.#matches = [];

        // Initialize the win counters
        this.#win_counts = { player: 0, computer: 0 };

        // Init the instructions element
        this.#instructions_el = document.getElementById("instructions");

        // Init the score element and hide it as the game has not started
        this.#score_el = document.getElementById("score");
        this.#score_el.style.display = "none";

        // Init the start button element and attach an event listener
        this.#start_button_container_el = document.getElementById("start_button_container");
        this.#start_button_el = document.getElementById("start_button");
        this.#start_button_el.addEventListener("click", () => this.start_game());
        
        // Init the player selection elements and attach an event listener
        this.#player_selection_container_el = document.getElementById("player_selection_container");
        this.#player_selection_options_el = document.getElementById("player_selection_options");
        this.#player_selection_container_el.style.display = "none";
        this.#player_selection_options_el.addEventListener("click", (e) => {
            const choice = e.target.innerText;
            if (choice != "ROCK" && choice != "PAPER" && choice != "SCISSORS") return;
            this.#play_match(choice);
        });
        
        // Init the winner's container
        this.#winner_container_el = document.getElementById("winner_container");
        this.#winner_container_el.style.display = "none";

        // Init the matches container
        this.#matches_container_el = document.getElementById("matches_container");
        this.#matches_container_el.style.display = "none";

    }






    /**
     * Starts the game by hiding and showing the appropiate elements
     */
    start_game() {
        // Replace the instructions with the game's score
        this.#instructions_el.style.display = "none";
        this.#score_el.style.display = "block";
        this.#set_score();

        // Hide the start button
        this.#start_button_container_el.style.display = "none";

        // Display the player's selection box
        this.#player_selection_container_el.style.display = "block";

        // Display the matches container
        this.#matches_container_el.style.display = "block";
    }






    /**
     * When the player chooses a weapon, a random choice is generated for the
     * computer and both weapons are evaluated. Once the player or the computer
     * reaches 5 victories, the game stops and the winner is set.
     */
    #play_match(player_choice) {
        // The computer chooses its weapon
        const computer_choice = this.#get_computer_choice();

        // Calculate the winner of the match
        const winner = this.#calculate_winner(player_choice, computer_choice);

        // Increment the counter if it isn't a tie
        if (winner != "tie") this.#win_counts[winner] += 1;

        // Put together the match record and add it to the list
        this.#matches.push({
            player_choice: player_choice,
            computer_choice: computer_choice,
            winner: winner
        });

        // Handle the match post actions
        this.#on_match_played();
    }




    /**
     * Triggers whenever a match is played and handles the after effects of the match. 
     * It also handles the end of the game.
     */
    #on_match_played() {
        // Add the match to the game payload
        this.#matches_container_el.innerHTML = this.#matches.reduce(
            (accum, current) => accum += this.#build_match_record_content(current), 
            ""
        );

        // Update the score
        this.#set_score();

        // Check if the game ended
        if (this.#win_counts.player == 5 || this.#win_counts.computer == 5) {
            // Hide the player's selection box
            this.#player_selection_container_el.style.display = "none";

            // Set & display the winner
            this.#winner_container_el.innerText = 
                `${this.#win_counts.player == 5 ? "PLAYER": "COMPUTER"} WINS!`;
            this.#winner_container_el.style.display = "block";
        }
    }



    /**
     * Puts together the HTML content for a match record.
     * @param record 
     * @returns string
     */
    #build_match_record_content(record) {
        let match_content;
        if (record.winner == "tie") {
            match_content = `
                <p>Nobody Wins</p>
                <p>${record.player_choice} (Player) does not beat ${record.computer_choice} (Computer)</p>
            `;
        } else if (record.winner == "player") {
            match_content = `
                <p>Player Wins!</p>
                <p>${record.player_choice} (Player) beats ${record.computer_choice} (Computer)</p>
            `;
        } else {
            match_content = `
                <p>Computer Wins!</p>
                <p>${record.computer_choice} (Computer) beats ${record.player_choice} (Player)</p>
            `;
        }
        return `<div>${match_content}<hr></div>`
    }





    /**
     * Generates a random number and picks one of the choices based on it.
     * @returns string
     */
    #get_computer_choice() {
        // Calculate a random number
        const random_number = Math.random();

        // Select a choice based on the value
        if (random_number >= 0.66) {
            return "ROCK";
        } else if (random_number >= 0.33) {
            return "PAPER";
        } else {
            return "SCISSORS";
        }
    }








    /**
     * Evaluates both choices and returns the winner in string format.
     * If both, the player & the computer made the same choice, it 
     * returns "tie".
     * @param player_choice 
     * @param computer_choice 
     * @returns string
     */
    #calculate_winner(player_choice, computer_choice) {
        // If both made the same selection, there is no winner
        if (player_choice == computer_choice) {
            return "tie";
        }

        // Check if the player won
        else if (
            (player_choice == "PAPER" && computer_choice == "ROCK") ||
            (player_choice == "ROCK" && computer_choice == "SCISSORS") ||
            (player_choice == "SCISSORS" && computer_choice == "PAPER")
        ) {
            return "player";
        }

        // Otherwise, the computer won
        else { 
            return "computer";
        }
    }










    /**
     * Sets the current score on the app's heading.
     */
    #set_score() {
        this.#score_el.innerText = 
            `PLAYER: ${this.#win_counts.player} | COMPUTER: ${this.#win_counts.computer}`;
    }
}







/**
 * Application Initializer
 * DO NOT MODIFY THIS CODE
 */
const app = new App();