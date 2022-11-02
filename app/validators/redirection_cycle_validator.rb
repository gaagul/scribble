# frozen_string_literal: true

class RedirectionCycleValidator < ActiveModel::Validator
  include ActionView::Helpers::TranslationHelper

  def validate(record)
    @slow = record.to
    @fast = record.to
    @all = Redirection.all.to_a
    @all.unshift(record)
    while @fast != true do
      fast_jump
      if @fast != true
        slow_jump
      end
      if @fast == @slow
        record.errors.add(:base, t("redirection.creates_loop")) and return
      end
    end
  end

  private

    def fast_jump
      x = @all.select { |red| red.from == @fast }
      first_destination = x.empty? || x[0].to
      second_destination = true
      y = @all.select { |red| red.from == first_destination }
      second_destination = (y.empty? || y[0].to) unless first_destination == true
      @fast = second_destination
    end

    def slow_jump
      x = @all.select { |red| red.from == @slow }
      @slow = x.empty? || x[0].to unless @fast == @slow
    end
end
