




/**
 * Application Instance
 * The instance of the game is initializes and ready to be started.
 */
class App {
    // The matches' payload
    #matches;

    // The win counters
    #win_counts;


    constructor () {

    }






    /**
     * Starts a game that will run a number of matches, declare
     * a winner and show the game summary at the end.
     * @param match_num 
     */
    start_game(match_num = 5) {
        // Reset the game data
        this.#reset_game_data();

        // Play until the match limit has been reached
        while (this.#matches.length < match_num) {
            this.#play_match();
        }
        
        // Finally, display the game's result
        this.#display_game_result();
    }








    /**
     * Gathers both choices from the player and the computer and 
     * evaluates them. If there is a winner, it processes the
     * information so it can be displayed at the end of the game.
     */
    #play_match() {
        // Gather both choices
        const player_choice = this.#get_player_choice();
        const computer_choice = this.#get_computer_choice();

        // Calculate the winner of the match
        const winner = this.#calculate_winner(player_choice, computer_choice);

        // Process the results if it wasn't a tie
        if (winner != "tie") {
            this.#win_counts[winner] += 1;
            this.#matches.push({
                player_choice: player_choice,
                computer_choice: computer_choice,
                winner: winner
            });
        }

        // Print the match's result
        this.#display_match_result(player_choice, computer_choice, winner);
    }

















    /****************************
     * Player & Computer Choice *
     ****************************/




    /**
     * Generates a random number and picks one of the choices based on it.
     * @returns string
     */
    #get_computer_choice() {
        // Calculate a random number
        const random_number = Math.random();

        // Select a choice based on the value
        if (random_number >= 0.66) {
            return "rock";
        } else if (random_number >= 0.33) {
            return "paper";
        } else {
            return "scissors";
        }
    }






    /**
     * Asks the player to input their choice for the active match persistently.
     * @returns string
     */
    #get_player_choice() {
        // Initialize the player's choice
        let player_choice = "";

        // Iterate until a valid input is provided
        while (!this.#is_choice_valid(player_choice)) {
            player_choice = prompt("Enter your choice (rock, paper or scissors)").toLowerCase();
        }

        // Finally, return the choice
        return player_choice;
    }




    /**
     * Verifies if a given choice is valid.
     * @param choice 
     * @returns boolean
     */
    #is_choice_valid(choice) {
        return  typeof(choice) == "string" && 
                (choice == "rock" || choice == "paper" || choice == "scissors");
    }












    /****************
     * Misc Helpers *
     ****************/






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
            (player_choice == "paper" && computer_choice == "rock") ||
            (player_choice == "rock" && computer_choice == "scissors") ||
            (player_choice == "scissors" && computer_choice == "paper")
        ) {
            return "player";
        }

        // Otherwise, the computer won
        else { 
            return "computer";
        }
    }







    /**
     * Displays the result of a single match.
     * @param player_choice 
     * @param computer_choice 
     * @param winner 
     */
    #display_match_result(player_choice, computer_choice, winner) {
        if (winner == "tie") { 
            console.log(`\n\nTIE: Both, the player and the computer picked: ${player_choice}`);
        } else if (winner == "player") {
            console.log(`\n\nPLAYER WINS! ${player_choice} beats ${computer_choice}\n`);
        } else {
            console.log(`\n\nCOMPUTER WINS! ${computer_choice} beats ${player_choice}\n`);
        }
    }







    /**
     * Displays the game results once all the matches have been played.
     */
    #display_game_result() {
        console.clear();
        console.log("Rock Paper Scissors Championship\n");
        console.log(`${this.#win_counts.player > this.#win_counts.computer ? "Player": "Computer"} Wins!\n\n`);

        console.log("Final Scores:");
        console.log(`Player: ${this.#win_counts.player}`);
        console.log(`Computer: ${this.#win_counts.computer}\n\n`);

        console.log("Matches:");
        for (let i = 0; i < this.#matches.length; i++) {
            console.log(`\n\nMatch #${i + 1}'s Winner: ${this.#matches[i].winner}`);
            if (this.#matches[i].winner == "player") {
                console.log(`${this.#matches[i].player_choice} beats ${this.#matches[i].computer_choice}\n`);
            } else {
                console.log(`${this.#matches[i].computer_choice} beats ${this.#matches[i].player_choice}\n`);
            }
        }
    }





    /**
     * Resets the game's data so the "Play Again" flow can be implemented.
     */
    #reset_game_data() {
        console.clear();
        this.#matches = [];
        this.#win_counts = { player: 0, computer: 0 };
    }
}







/**
 * Application Initializer
 * DO NOT MODIFY THIS CODE
 */
const app = new App();
app.start_game(); // <- @DEPRECATE WHEN THE GUI IS IMPLEMENTED