Bot.register("rob-bot", function(game_state, player_state, move) {
    var me = game_state.me;
    var them = game_state.them;
    var board = game_state.board;
    var safe_dirs = board.safe_directions(me)
    me.partitiontop = false;
    me.partitionbot = false;
    me.lefttop = false;
    me.leftbot = false;
    for (i = 0; i < board.width; i += 1) {
        if (board.get_hex_at({x:i, y:0}).color == me.color) {
            me.partitiontop = true;
            if (me.x < i) {
                me.lefttop = true;
            }
        }
        if (board.get_hex_at({x:i, y:height-1}).color == me.color) {
            me.partitionbot = true;
            if (me.x < i) {
                me.leftbot = true;
            }
        }
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
                if (safe_dirs.contains(1)) {
                    move(1);
                } else if ((me.y + 1 < board.height / 2) && safe_dirs.contains(4)) {
                    move(4);
                } else if (safe_dirs.contains(2)) {
                    move(2);
                } else if (safe_dirs.contains(3)) {
                    move(3);
                }
            } else {
                if (safe_dirs.contains(1)) {
                    move(1);
                } else if ((me.y + 1 < board.height / 2) && safe_dirs.contains(4)) {
                    move(4);
                } else if (safe_dirs.contains(0)) {
                    move(0);
                } else if (safe_dirs.contains(5)) {
                    move(5);
                }
            }
        } else {
            if (me.leftbot) {
                if (safe_dirs.contains(4)) {
                    move(4);
                } else if ((me.y - 1 >= board.height / 2) && (safe_dirs.contains(1))) {
                    move(1);
                } else if (safe_dirs.contains(2)) {
                    move(2);
                } else if (safe_dirs.contains(3)) {
                    move(3);
                }
            } else {
                if (safe_dirs.contains(4)) {
                    move(4);
                } else if ((me.y - 1 >= board.height / 2) && (safe_dirs.contains(1))) {
                    move(1);
                } else if (safe_dirs.contains(0)) {
                    move(0);
                } else if (safe_dirs.contains(5)) {
                    move(5);
                }
            }
        }
    }
});
