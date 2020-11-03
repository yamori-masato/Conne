class Game
    def self.start(uuid1, uuid2)
        first, second = [uuid1, uuid2].shuffle

        ActionCable.server.broadcast "player_#{first}", {action: "game_start", msg: "first"}
        ActionCable.server.broadcast "player_#{second}", {action: "game_start", msg: "second"}

        REDIS.set("opponent_for:#{first}", second)
        REDIS.set("opponent_for:#{second}", first)
    end
  
    def self.opponent_for(uuid)
        REDIS.get("opponent_for:#{uuid}")
    end

    # def self.forfeit(uuid)
    #     if winner = opponent_for(uuid)
    #         ActionCable.server.broadcast "player_#{winner}", {action: "opponent_forfeits"}
    #     end
    # end
  
    # def self.make_move(uuid, data)
    #     opponent = opponent_for(uuid)
    #     move_string = "#{data["from"]}-#{data["to"]}"
    
    #     ActionCable.server.broadcast "player_#{opponent}", {action: "make_move", msg: move_string}
    # end
  end