class Game
    def self.start(uuid1, uuid2)
        first, second = [uuid1, uuid2].shuffle

        ActionCable.server.broadcast "player_#{first}", {type: "game_start", order: "first"}
        ActionCable.server.broadcast "player_#{second}", {type: "game_start", order: "second"}

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
  
    def self.send_to_other(uuid, data)
        opponent = opponent_for(uuid)

        ActionCable.server.broadcast "player_#{opponent}", data
    end
  end