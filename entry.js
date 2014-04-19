Bot.register("rob-bot", function(game_state, player_state, move) {
    var me = game_state.me;
    var them = game_state.them;
    var board = game_state.board;
    var safe_dirs = board.safe_directions(me)
    if (!me.hasOwnProperty('partitiontop')) {
        me.partitiontop = false;
        me.partitionbot = false;
    }
    if (me.y == 0 || ((me.y < board.height / 2) && (me.x == 0 || me.x == board.width - 1))) {
        me.partitiontop = true;
        me.lefttop = me.x < them.x;
    }
    if (me.y == board.height - 1 || ((me.y >= board.height / 2) && (me.x == 0 || me.x == board.width - 1))) {
        me.partitionbot = true;
        me.leftbot = me.x < them.x;
    }
    if (!me.partitionbot && !me.partitiontop) {    
        if (them.last_move - 3 < 0 && me.y <= 0) {
            if (me.last_move === 1) {
                move(5);
            } else {
                move(4);
            }
        } else if (me.last_move - 3 >= 0 && me.y >= 14) {
            if (me.last_move === 4) {
                move(0);
            } else {
                move(1);
            }
        } else if (me.y <= 1 &&(me.last_move == 4 || me.last_move == 5)) {
            move(3);
        } else if (me.y >= 13 && (me.last_move == 1 || me.last_move == 1)) {
            move(2);
        } else if (me.y == 7 && me.x == 12 && (me.last_move == 3)) {
            move(5);
        } else if (me.y == 7 && me.x == 12 && (me.last_move == 2)) {
            move(0);
        }
    } else if (!me.partitionbot || !me.partitiontop) {
    } else {
        if (me.y < board.height / 2) {
            if (me.lefttop) {
                if (1 in safe_dirs) {
                    move(1);
                } else if ((me.y + 1 < board.height / 2) && (4 in safe_dirs)) {
                    move(4);
                } else if (2 in safe_dirs) {
                    move(2);
                } else if (3 in safe_dirs) {
                    move(3);
                }
            } else {
                if (1 in safe_dirs) {
                    move(1);
                } else if ((me.y + 1 < board.height / 2) && (4 in safe_dirs)) {
                    move(4);
                } else if (0 in safe_dirs) {
                    move(0);
                } else if (5 in safe_dirs) {
                    move(5);
                }
            }
        } else {
            if (me.leftbot) {
                if (4 in safe_dirs) {
                    move(4);
                } else if ((me.y - 1 >= board.height / 2) && (1 in safe_dirs)) {
                    move(1);
                } else if (2 in safe_dirs) {
                    move(2);
                } else if (3 in safe_dirs) {
                    move(3);
                }
            } else {
                if (4 in safe_dirs) {
                    move(4);
                } else if ((me.y - 1 >= board.height / 2) && (1 in safe_dirs)) {
                    move(1);
                } else if (0 in safe_dirs) {
                    move(0);
                } else if (5 in safe_dirs) {
                    move(5);
                }
            }
        }
    }
});
