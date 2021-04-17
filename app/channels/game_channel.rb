class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "player_#{uuid}"
    Seek.create(uuid)
  end

  def unsubscribed
    Seek.remove(uuid)
  end

  def receive(data)
    Game.send_to_other(uuid,data)
  end
end
